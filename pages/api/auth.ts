import { NextApiRequest, NextApiResponse } from 'next'
import { createHmac } from 'crypto'
import {
  createDataCheckStringFromUserData,
  transformInitData,
} from '../../lib/telegram'
import { initUser } from '../../lib/authorization'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const initData = transformInitData(request.body.initData)
  const data_check_string = createDataCheckStringFromUserData(initData)
  const secret_key = createHmac('sha256', 'WebAppData')
    .update(process.env.BOT_TOKEN)
    .digest()

  const hash = createHmac('sha256', secret_key)
    .update(data_check_string)
    .digest('hex')

  if (hash === initData.hash && initData.user) {
    const user = JSON.parse(initData.user) as WebAppUser
    const {
      user: { id, ...userData },
      token,
    } = await initUser(user)

    response.status(200).json({
      status: 'Authorized',
      user: userData,
      token,
    })
    return
  }

  return response.status(403).json({ status: 'Unauthorized' })
}
