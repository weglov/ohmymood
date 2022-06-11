import { NextApiRequest, NextApiResponse } from "next";
import HMAC_SHA256 from 'crypto-js/hmac-sha512';
import CryptoJS from 'crypto-js'


export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const data_check_string = 'todo'
  const hash = 'data_check_string'
  const secret_key = HMAC_SHA256(process.env.BOT_TOKEN, "WebAppData")
  
  console.log(request.body)

  if (CryptoJS.enc.Hex.parse(HMAC_SHA256(data_check_string, secret_key)) === hash) {
    return response.status(200).json({
      status: 'Authorized'
    });
  }
  
  return response.status(403).json({status: 'Unauthorized'})
}
