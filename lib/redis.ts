import Redis from 'ioredis'
import { sendTelegramPing } from './telegram'
import { shuffle } from 'lodash'
import texts from '../constants/texts.json'
import { hygraphClient } from './hygraph'
import { GetAuthor } from './authorization'

const client = new Redis(process.env.REDIS_URL)
let INTERVAL_NOTIFY = 18000 * 1000 // 5h

export const notifiyTelegramUsers = async () => {
  const keys = await client.keys('*')

  await Promise.allSettled(
    keys.map(async (id) => {
      const lastMessageDate = await client.get(id)

      if (Date.now() - Number(lastMessageDate) > INTERVAL_NOTIFY) {
        const { author } = await hygraphClient.request(GetAuthor, { tid: id })

        await sendTelegramPing({
          chat_id: id,
          text: shuffle(texts.ping_to_action)[0].replace(
            '$1',
            `@${author.username}`
          ),
        })
        return await client.set(id, Date.now())
      }

      return Promise.resolve()
    })
  )
}

export const updateLastMessage = async (chat_id: string) => {
  client.set(chat_id, Date.now())
}
