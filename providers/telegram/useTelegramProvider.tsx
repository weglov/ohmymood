import { useInterval } from "@chakra-ui/react";
import { useState } from "react";
import { TelegramWebApps } from "../../types/global";
import { useTelegramInfo } from "./useTelegramInfo";

export const useTelegramProvider = () => {
  const [tgData, setTgData] = useState<TelegramWebApps.WebApp | null>(null);
  console.log(tgData);

  useInterval(() => {
    if (window.Telegram?.WebApp) {
      setTgData(window.Telegram.WebApp);
    }
  }, 1000);

  return {
    data: tgData,
  };
};
