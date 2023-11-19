import jwt from 'jsonwebtoken'
import { NextApiRequest, NextApiResponse } from 'next'

type Secret = { userId: string; chatId: string }

export const createJWT = (secret: Secret) =>
  jwt.sign(secret, process.env.BOT_TOKEN)
export const getSession = (
  request: NextApiRequest,
  response: NextApiResponse
): Secret => {
  try {
    return jwt.verify(
      request.headers['x-token'] as string,
      process.env.BOT_TOKEN
    ) as Secret
  } catch (e) {
    return response.status(403).json({ error: e }) as any
  }
}
