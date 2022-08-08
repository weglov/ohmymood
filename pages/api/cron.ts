import { NextApiRequest } from "next";
import { notifiyTelegramUsers } from "../../lib/redis";

export default async function handler(req: NextApiRequest) {
  if (req.method === "POST") {
    await notifiyTelegramUsers();
  }
}
