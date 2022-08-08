import { gql } from 'graphql-request'
import { hygraphClient } from './hygraph'
import { createJWT } from './token'

const CreateAuthor = gql`
  mutation CreateAuthor(
    $tid: String!
    $first_name: String
    $last_name: String
    $language_code: String
    $username: String
  ) {
    createAuthor(
      data: {
        tid: $tid
        firstName: $first_name
        lastName: $last_name
        languageCode: $language_code
        username: $username
      }
    ) {
      firstName
      lastName
      username
      languageCode
      tid
    }
  }
`

const PublishAuthor = gql`
  mutation PublishAuthor($tid: String!) {
    publishAuthor(where: { tid: $tid }) {
      id
      firstName
      lastName
      username
      languageCode
      tid
    }
  }
`

const GetAuthor = gql`
  query GetAuthor($tid: String!) {
    author(where: { tid: $tid }) {
      id
      firstName
      lastName
      username
      languageCode
      tid
    }
  }
`

export const initUser = async (
  initData: WebAppUser
): Promise<{ user: WebAppUser; token: string }> => {
  const { id, ...userData } = initData
  const tid = String(id)

  const { author } = await hygraphClient.request(GetAuthor, { tid })

  if (author) {
    return {
      user: author,
      token: createJWT({ userId: author.id, chatId: tid }),
    }
  }

  try {
    await hygraphClient.request(CreateAuthor, { tid, ...userData })
  } catch {
    // user might be already created but not yet publish, so in this case move next
  }

  const { publishAuthor } = await hygraphClient.request(PublishAuthor, { tid })
  return {
    user: publishAuthor,
    token: createJWT({ userId: publishAuthor.id, chatId: tid }),
  }
}
