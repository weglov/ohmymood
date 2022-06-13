import { NextApiRequest, NextApiResponse } from "next";
import {createHmac} from 'crypto'

function transformInitData(initData) {
  return Object.fromEntries(new URLSearchParams(initData));
}

export function createDataCheckStringFromUserData({hash, ...user_data}: any): string {
  const key = Object
    .keys(user_data)
    .map(key => `${key}=${user_data[key]}`)
  key.sort()

  return key.join(`\n`)
}

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const initData = transformInitData(JSON.parse(request.body).initData)

  const data_check_string = createDataCheckStringFromUserData(initData)
  const secret_key = createHmac('sha256', "WebAppData")
  .update(process.env.BOT_TOKEN)
  .digest();
  
  const hash = createHmac("sha256", secret_key).update(data_check_string).digest("hex")


  if (hash === initData.hash && initData.user) {
    const user = JSON.parse(initData.user)

    response.status(200).json({status: 'Authorized', user})
    return
  }

  
  return response.status(403).json({status: 'Unauthorized'})
}
