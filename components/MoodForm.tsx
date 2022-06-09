import { useState } from "react";
import {
  Text,
  HStack,
  RadioGroup,
  Radio,
  FormControl,
  Input,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

export const MoodForm = () => {
  const [mood, setMood] = useState("0");

  return (
    <>
      <RadioGroup onChange={setMood} value={mood}>
        <HStack>
          <Radio value="1">🙂</Radio>
          <Radio value="2">😕</Radio>
          <Radio value="3">😎</Radio>
        </HStack>
      </RadioGroup>
      <FormControl>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input id="email" type="email" />
        <FormHelperText>We'll never share your email.</FormHelperText>
      </FormControl>
    </>
  );
};
