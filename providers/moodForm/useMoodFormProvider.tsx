import { useCallback, useState } from "react";
import {
  Mood,
  useCreateMarkMutation,
  usePublishMarkMutation,
} from "../../api/generated/graphql";
import { useTelegramInfo } from "../telegram";
import { Toast, useToast } from "@revolut/ui-kit";

type FormData = {
  mood?: Mood;
  note: string;
  tags: string[];
};

export const useMoodFormProvider = () => {
  const { user, tg } = useTelegramInfo();
  const [isDirty, setDirty] = useState(true);
  const [formData, setFormData] = useState<FormData>({
    mood: null,
    note: "",
    tags: [],
  });

  const toast = useToast();

  const [publishMarkMutation, { loading: publishLoading }] =
    usePublishMarkMutation();

  const [createMarkMutation, { loading: createLoading }] =
    useCreateMarkMutation({
      variables: {
        mood: formData.mood,
        note: formData.note,
        author: user?.id.toString(),
      },
      onCompleted: (data) => {
        setDirty(false);
        publishMarkMutation({ variables: { id: data.createMark.id } });
        setFormData({ mood: null, note: "", tags: [] });
        toast.show(
          <Toast>
            <Toast.Label>Saved! Have a great day.</Toast.Label>
          </Toast>,
          "short",
          () => {}
        );
      },
    });

  const updateMood = useCallback(
    (data: Partial<FormData>) => {
      setFormData({ ...formData, ...data });
    },
    [setFormData, formData]
  );

  const saveMood = useCallback(async () => {
    tg.WebApp.MainButton.showProgress(false);
    const { data } = await createMarkMutation();
    await publishMarkMutation({ variables: { id: data.createMark.id } });

    tg.WebApp.MainButton.hideProgress();
  }, [tg, createMarkMutation, publishMarkMutation]);

  return {
    ...formData,
    valid: formData.mood && isDirty,
    updateMood,
    saveMood,
    loading: createLoading || publishLoading,
  };
};
