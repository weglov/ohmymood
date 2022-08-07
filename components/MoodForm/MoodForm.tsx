import {
  Header,
  Relative,
  TextArea,
  VStack,
  useDateFormat,
  Widget,
  Subheader,
  TransitionSlide,
  Button,
  Box,
} from "@revolut/ui-kit";
import { AxiosResponse } from "axios";

import { useEffect } from "react";
import { useQuery } from "react-query";
import { Mark } from "../../types";
import { client } from "../../lib/api";

import { useMoodForm, useTelegramInfo } from "../../providers";
import { TotalChart } from "../Charts";
import {History} from './History'
import { RateInput } from "./RateInput";

export const MoodForm = () => {
  const dateFormat = useDateFormat({ style: "precise" });
  const { tg } = useTelegramInfo();
  const { mood, updateMood, saveMood } = useMoodForm();

  const {data} = useQuery<AxiosResponse<{marks:Mark[]}>>("my-marks", () => client.get('/api/marks'))
  const marks = data?.data.marks  

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
          <TextArea
            rows={3}
            label="Your thoughts or feelings"
            onChange={(e) => updateMood({ note: e.currentTarget.value })}
          />
        </TransitionSlide>
        {process.env.NODE_ENV === 'development' && <Button onClick={saveMood}>Save</Button>}
        <Widget>
          <Box p='s-24'>
          <Subheader>
            <Subheader.Title>Your dynamic:</Subheader.Title>
          </Subheader>
          </Box>
          {marks && <TotalChart marks={marks} />}
        </Widget>
          {marks && <History marks={marks}/>}
      </VStack>
    </Relative>
  );
};
