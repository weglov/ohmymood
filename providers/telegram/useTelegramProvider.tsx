import { useInterval } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { TelegramWebApps } from "../../types/global";

export const useTelegramProvider = () => {
  const [init, setInit] = useState(false);
  const telegramData = useRef<TelegramWebApps.SDK | undefined>(undefined);

  const { data, isLoading } = useQuery<{ status: string }>(
    "init",
    async () => {
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          initData: telegramData.current.WebApp.initData,
        }),
      });

      const json = await response.json();

      return json;
    },
    {
      enabled: init,
      retry: false,
    }
  );

  console.log(data, isLoading);

  useInterval(
    function initTelegramSession() {
      if (window.Telegram) {
        telegramData.current = window.Telegram;
        telegramData.current.WebApp.ready();
        setInit(true);
      }
    },
    !init ? 100 : null
  );

  return {
    tg: telegramData.current,
    status: data?.status,
  };
};
