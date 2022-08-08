import { ErrorWidget } from "@revolut/ui-kit";

import { useTelegramInfo } from "../../providers";
import { FormSkeleton } from "../FormSkeleton";
import { MoodForm } from "./MoodForm";

const env = process.env.NODE_ENV;

export const Mood = () => {
  const { tg, user, isInitialized } = useTelegramInfo();

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
        <ErrorWidget.Action onClick={() => window.location.reload()} />
      </ErrorWidget>
    );
  }

  return <MoodForm />;
};
