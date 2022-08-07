import {
  Header,
  Relative,
  TextArea,
  VStack,
  useDateFormat,
  Widget,
  Subheader,
  Button,
  TransitionSlide,
} from "@revolut/ui-kit";
import { useMyMarksQuery } from "../../api/generated/graphql";

import { useMoodForm, useTelegramInfo } from "../../providers";
import { TotalChart } from "../Charts";

import { RateInput } from "./RateInput";

export const MoodForm = () => {
  const dateFormat = useDateFormat({ style: "precise" });
  const { user } = useTelegramInfo();
  const {
    mood,
    updateMood,
    createMarkMutation,
    loading: saveLoading,
  } = useMoodForm();

  const { data } = useMyMarksQuery({
    variables: {
      author: user!.id.toString(),
    },
  });

  return (
    <Relative>
      <Header variant="main">
        <Header.Title>Your Mood Today</Header.Title>
        <Header.Subtitle>{dateFormat(new Date())}</Header.Subtitle>
      </Header>
      <VStack space="s-24">
        <RateInput />
        <TransitionSlide in={Boolean(mood)}>
            <TextArea
              rows={3}
              label="Your thoughts or feelings"
              onChange={(e) => updateMood({ note: e.currentTarget.value })}
            />
            <Button
              elevated
              onClick={() => createMarkMutation()}
              pending={saveLoading}
            >
              Save
            </Button>
        </TransitionSlide>
        <Widget p="s-8">
          <Subheader>
            <Subheader.Title>Your monthly dynamic:</Subheader.Title>
          </Subheader>
          {data?.marks && <TotalChart marks={data.marks} />}
        </Widget>
      </VStack>
    </Relative>
  );
};
