import { useState } from "react";
import { useQuery } from "react-query";
import { useInterval } from "../../hooks/useInterval";
import { tgFake } from "./__fake";

const isDev = process.env.NODE_ENV === "development";

export const useTelegramProvider = () => {
  const [init, setInit] = useState(false);
  const [user, setUser] = useState<WebAppUser | undefined>(undefined);
  const [telegramData, setTelegramData] = useState<Telegram | undefined>(
    undefined
  );

  const { data, isFetched } = useQuery<{
    status: "Authorized" | "Unauthorized";
    user: WebAppUser;
  }>(
    "init",
    async () => {
      const response = await fetch("/api/auth", {
        method: "POST",
        body: JSON.stringify({
          initData: telegramData?.WebApp.initData,
        }),
      });

      const json = await response.json();
      return json;
    },
    {
      enabled: init,
      retry: false,
      onSuccess: ({ user }) => {
        setUser(user);
      },
    }
  );

  useInterval(
    function initTelegramSession() {
      if (window.Telegram) {
        setTelegramData(isDev ? tgFake : window.Telegram);
        window.Telegram.WebApp.ready();
        setInit(true);
      }
    },
    !init ? 100 : null
  );

  return {
    isInitialized: isFetched && init,
    tg: telegramData,
    user,
    status: data?.status,
  };
};
