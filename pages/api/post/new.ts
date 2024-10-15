import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    try {
      await db.collection("post").insertOne(req.body);
      return res.status(200).redirect(302, "/list");
    } catch (error) {
      console.log(error);
      return res.status(500).redirect(302, "/error");
    }
    // redirect(302,"/경로"); 리다이렉트 기능
  }
}

// next.JS를 활용해서 mongoDB에 post 요청하기
// await db.collection("post").insertOne(req.body); // DB에 document 하나 발행을 해줍니다.
