import { useDateFormat, ErrorWidget } from "@revolut/ui-kit";

import { useMoodForm, useTelegramInfo } from "../../providers";
import { FormSkeleton } from "../FormSkeleton";
import { MoodForm } from "./MoodForm";

export const Mood = () => {
  const { user, isInitialized } = useTelegramInfo();

  if (!isInitialized) {
    return <FormSkeleton />;
  }
  if (!user) {
    return (
      <ErrorWidget>
        <ErrorWidget.Image />
        <ErrorWidget.Title />
        <ErrorWidget.Description>
          Check back later to keep up to date with the progress of your invites.
        </ErrorWidget.Description>
        <ErrorWidget.Action onClick={() => console.log("Click")} />
      </ErrorWidget>
    );
  }

  return <MoodForm />;
};
