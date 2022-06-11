import { Container, Text, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useMarksQuery } from "../api/generated/graphql";
import { MoodForm } from "../components/MoodForm";
import { useTelegramInfo } from "../providers";

const IndexPage = () => {
  const { tg, status } = useTelegramInfo();
  const { data, error } = useMarksQuery();

  console.log(tg);

  return (
    <Container>
      <Text fontSize="3xl">Your mood today</Text>
      <MoodForm />
      <Box w="100%">
        <code>Status: {status}</code>
      </Box>
      <code>{JSON.stringify(tg?.WebApp)}</code>
    </Container>
  );
};

export default IndexPage;
