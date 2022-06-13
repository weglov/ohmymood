import { AwesomeGraphQLClient } from "awesome-graphql-client";
import { NextApiRequest, NextApiResponse } from "next";


const client = new AwesomeGraphQLClient({
  endpoint: process.env.GRAPHCMS_ENDPOINT,
});

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const res = await client.request(request.body.query, request.body.variables)

  return response.status(200).json({ data: res });
}