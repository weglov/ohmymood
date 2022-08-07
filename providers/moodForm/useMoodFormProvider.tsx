import { useCallback, useState } from "react";
import { useTelegramInfo } from "../telegram";
import { Toast, useToast } from "@revolut/ui-kit";
import { Mood } from "../../types";
import { client } from "../../lib/api";
import { useMutation } from "react-query";

type FormData = {
  mood?: Mood;
  note: string;
  tags: string[];
};

export const useMoodFormProvider = () => {
  const { tg } = useTelegramInfo();
  const [isDirty, setDirty] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    mood: null,
    note: "",
    tags: [],
  });

  const toast = useToast();

  const {mutate: createMark, isLoading} = useMutation(() => client.post('/api/marks', formData), {
    onSuccess: () => {
      setDirty(false);
      setFormData({ mood: null, note: "", tags: [] });
      toast.show(
        <Toast>
          <Toast.Label>Saved! Have a great day.</Toast.Label>
        </Toast>,
        "short",
        () => {}
      );
    }
  })

  const updateMood = useCallback(
    (data: Partial<FormData>) => {
      setFormData({ ...formData, ...data });
    },
    [setFormData, formData]
  );

  const saveMood = useCallback(async () => {
    console.log(tg.WebApp?.MainButton)
    tg.WebApp?.MainButton?.showProgress(false);
    await createMark()
    tg.WebApp?.MainButton?.hideProgress();
  }, [tg]);

  return {
    ...formData,
    valid: formData.mood && isDirty,
    updateMood,
    saveMood,
    loading: isLoading
  };
};
