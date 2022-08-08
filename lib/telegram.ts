export function transformInitData(initData) {
  return Object.fromEntries(new URLSearchParams(initData));
}

export function createDataCheckStringFromUserData({
  hash,
  ...user_data
}: any): string {
  const key = Object.keys(user_data).map((key) => `${key}=${user_data[key]}`);
  key.sort();

  return key.join(`\n`);
}

export const sendTelegramPing = async ({
  chat_id,
  text,
}: {
  chat_id: string;
  text: string;
}) => {
  await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?chat_id=${chat_id}&text=${text}`
  );
};
