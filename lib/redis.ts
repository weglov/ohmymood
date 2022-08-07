import Redis from 'ioredis'
import { sendTelegramPing } from './telegram';

const client = new Redis("rediss://:2f47b84275d14c1893423f3a4db9d1ee@eu2-model-gator-30590.upstash.io:30590");
let INTERVAL_NOTIFY = 10800 * 1000 // 3h


export const notifiyTelegramUsers = async () => {
  const keys = await client.keys('*')
  await Promise.allSettled(keys.map(async (id) => {
    const lastMessageDate = await client.get(id)
    if (Date.now() - Number(lastMessageDate) > INTERVAL_NOTIFY) {
      await sendTelegramPing({ chat_id: id, text: 'Hey, seems like a great time to fix your mood for now'})
      return await client.set(id, Date.now())
    }

    return Promise.resolve()
  }))
}

export const updateLastMessage = async (chat_id: string) => {
  client.set(chat_id, Date.now())
}