import { Container, Text, useInterval } from "@chakra-ui/react";
import { useState } from "react";
import { useMarksQuery } from "../api/generated/graphql";
import { MoodForm } from "../components/MoodForm";

const IndexPage = () => {
  const [tgData, setTgData] = useState(null);
  const { data, error } = useMarksQuery();
  console.log(data, error);

  useInterval(() => {
    if (window.Telegram?.WebApp) {
      console.log(window.Telegram?.WebApp);
      setTgData(window.Telegram.WebApp);
    }
  }, 1000);

  return (
    <Container>
      <Text fontSize="3xl">Your mood today</Text>
      <MoodForm />
      <code>{JSON.stringify(tgData)}</code>
    </Container>
  );
};

export default IndexPage;
