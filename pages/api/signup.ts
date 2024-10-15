import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const db = (await connectDB).db("forum");
      const result = await db
        .collection("user")
        .findOne({ userId: req.body.userId });

      if (result !== null) {
        return res.status(200).json("중복된 아이디가있습니다.");
      }
      // await db.collection("user").insertOne(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
      // return res.status(500).redirect(302, "/error");
    }
  }
}
