import { gql } from 'graphql-request'
import { NextApiRequest, NextApiResponse } from 'next'
import { symbol } from '../../components/History'
import { hygraphClient } from '../../lib/hygraph'
import { updateLastMessage } from '../../lib/redis'
import { sendTelegramPing } from '../../lib/telegram'
import { getSession } from '../../lib/token'

const GetMarks = gql`
  query GetMyMarks($id: ID!) {
    marks(where: { author: { id: $id } }, orderBy: createdAt_DESC) {
      id
      note
      mood
      createdAt
    }
  }
`

const CreateMark = gql`
  mutation Mark($author: ID!, $mood: Mood!, $note: String) {
    createMark(
      data: { mood: $mood, note: $note, author: { connect: { id: $author } } }
    ) {
      id
      mood
      note
    }
  }
`

const UpdateMark = gql`
  mutation Mark($id: ID!, $mood: Mood!, $note: String) {
    updateMark(data: { note: $note, mood: $mood }, where: { id: $id }) {
      id
      mood
      note
    }
  }
`

const PublishMark = gql`
  mutation PublishMark($id: ID!) {
    publishMark(where: { id: $id }) {
      id
      mood
      note
    }
  }
`

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const result = await getSession(request, response)
  const { userId, chatId } = result

  if (request.method === 'GET') {
    const { marks } = await hygraphClient.request(GetMarks, { id: userId })
    response.status(200).json({ marks })
    return
  }

  if (request.method === 'PATCH') {
    const { updateMark } = await hygraphClient.request(UpdateMark, {
      ...request.body,
    })

    await hygraphClient.request(PublishMark, { id: updateMark.id })
    response.status(200).json({ ...updateMark })
    sendTelegramPing({
      chat_id: chatId,
      text: `OK, mood check has been updated: ${
        symbol[updateMark.mood]
      }. \n Have a great day.`,
    })
    updateLastMessage(chatId)
    return
  }

  if (request.method === 'POST') {
    const { createMark } = await hygraphClient.request(CreateMark, {
      ...request.body,
      author: userId,
    })
    await hygraphClient.request(PublishMark, { id: createMark.id })
    response.status(200).json({ ...createMark })
    sendTelegramPing({
      chat_id: chatId,
      text: `OK, mood check has been captured: ${
        symbol[createMark.mood]
      }. \n Have a great day.`,
    })
    updateLastMessage(chatId)
  }
}
