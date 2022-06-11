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

const testData = {"query_id":"AAFSiAYAAAAAAFKIBgAVwf2H","user":{"id":428114,"first_name":"Viktor","last_name":"Shcheglov","username":"scheglov","language_code":"en"},"auth_date":"1654971177","hash":"665337db2506d9440fddf0f1535d9e8928c4fb306d9ff43d53cc8637480f3a91"}

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const initData = transformInitData(request.body.initData || testData)

  const data_check_string = createDataCheckStringFromUserData(initData)
  const secret_key = createHmac('sha256', "WebAppData")
  .update(process.env.BOT_TOKEN)
  .digest();
  
  const hash = createHmac("sha256", secret_key).update(data_check_string).digest("hex")
  console.log(111, hash, initData.hash, data_check_string)

  if (hash === initData.hash) {
    response.status(200).json({status: 'Authorized!'})
  }

  
  return response.status(403).json({status: 'Unauthorized'})
}
