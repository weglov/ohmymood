import { NextApiRequest, NextApiResponse } from "next";
import {createHmac} from 'crypto'


export function createDataCheckStringFromUserData(user_data: any): string {
  delete user_data.hash
  const key = Object.keys(user_data).map(key => `${key}=${user_data[key]}`)
  key.sort()
  return key.join(`\n`)
}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const data_check_string = createDataCheckStringFromUserData(request.body.initData)
  const secret_key = createHmac('sha256', "WebAppData")
  .update(process.env.BOT_TOKEN)
  .digest();
  
  const hash = createHmac("sha256", secret_key).update(data_check_string).digest("hex")
  console.log(hash, request.body.initData)

  if (hash === request.body.initData.hash) {
    response.status(200).json({status: 'Authorized!'})
  }

  
  return response.status(403).json({status: 'Unauthorized'})
}
