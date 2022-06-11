import { Container, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useMarksQuery } from "../api/generated/graphql";
import { MoodForm } from "../components/MoodForm";
import { useTelegramInfo } from "../providers";

const IndexPage = () => {
  const { data: tgData } = useTelegramInfo();
  const { data, error } = useMarksQuery();

  console.log(tgData);

  return (
    <Container>
      <Text fontSize="3xl">Your mood today</Text>
      <MoodForm />
    </Container>
  );
};

export default IndexPage;
