import {
  Header,
  Relative,
  TextArea,
  VStack,
  useDateFormat,
  Widget,
  Subheader,
  TransitionSlide,
} from "@revolut/ui-kit";

import { useEffect } from "react";
import { useMyMarksQuery } from "../../api/generated/graphql";

import { useMoodForm, useTelegramInfo } from "../../providers";
import { TotalChart } from "../Charts";

import { RateInput } from "./RateInput";

export const MoodForm = () => {
  const dateFormat = useDateFormat({ style: "precise" });
  const { user, tg } = useTelegramInfo();
  const { mood, updateMood, saveMood } = useMoodForm();

  const { data } = useMyMarksQuery({
    variables: {
      author: user!.id.toString(),
    },
  });

  useEffect(() => {
    if (mood) {
      tg.WebApp.MainButton.setText("Save");
      tg.WebApp.MainButton.show();
      tg.WebApp.MainButton.onClick(saveMood);
      return;
    }

    tg.WebApp.MainButton.hide();
  }, [mood, saveMood]);

  return (
    <Relative>
      <Header variant="main">
        <Header.Title>Your Mood Today</Header.Title>
        <Header.Subtitle>{dateFormat(new Date())}</Header.Subtitle>
      </Header>
      <VStack space="s-24">
        <RateInput />
        <TransitionSlide in={Boolean(mood)}>
          <>
            <TextArea
              rows={3}
              label="Your thoughts or feelings"
              onChange={(e) => updateMood({ note: e.currentTarget.value })}
            />
          </>
        </TransitionSlide>
        <Widget p="s-8">
          <Subheader>
            <Subheader.Title>Your dynamic:</Subheader.Title>
          </Subheader>
          {data?.marks && <TotalChart marks={data.marks} />}
        </Widget>
      </VStack>
    </Relative>
  );
};
