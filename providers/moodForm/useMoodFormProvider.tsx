import { useCallback, useState } from "react";
import { useTelegramInfo } from "../telegram";
import { Toast, useToast } from "@revolut/ui-kit";
import { Mood } from "../../types";
import { client } from "../../lib/api";
import { useMutation, useQueryClient } from "react-query";
import { useMainButton } from "../../hooks";

type FormData = {
  mood?: Mood;
  note: string;
};

export const useMoodFormProvider = () => {
  const { tg } = useTelegramInfo();
  const mainButton = useMainButton();
  const cacheClient = useQueryClient();
  const [isDirty, setDirty] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    mood: null,
    note: "",
  });

  const toast = useToast();

  const { mutate: createMark, isLoading } = useMutation(
    () => client.post("/api/marks", formData),
    {
      onSuccess: () => {
        setDirty(false);
        setFormData({ mood: null, note: "" });
        mainButton.hideProgress();
        toast.show(
          <Toast>
            <Toast.Label>Saved! Have a great day.</Toast.Label>
          </Toast>,
          "short",
          () => {
            cacheClient.invalidateQueries("my-marks");
          }
        );
      },
    }
  );

  const updateMood = useCallback(
    (data: Partial<FormData>) => {
      setFormData({ ...formData, ...data });
    },
    [setFormData, formData]
  );

  const saveMood = useCallback(async () => {
    mainButton.showProgress(false);
    await createMark();
  }, [createMark, mainButton]);

  return {
    ...formData,
    valid: formData.mood && isDirty,
    updateMood,
    saveMood,
    loading: isLoading,
  };
};
