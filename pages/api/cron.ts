import { NextApiRequest, NextApiResponse } from 'next';
import { sendTelegramPing } from '../../lib/telegram';

export default async function handler(
  req: NextApiRequest,
) {
  if (req.method === 'POST') {
    sendTelegramPing({chat_id: "428114", text: "test"})
  }
}