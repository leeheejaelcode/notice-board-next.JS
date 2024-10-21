import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const db = (await connectDB).db("forum");
      const user = await db.collection("user").findOne({
        userId: req.body.userId,
        userPassword: req.body.userPassword,
      });

      if (user) {
        // 성공적으로 사용자 정보를 찾았을 때
        return res.status(200).redirect(302, "/");
      } else {
        // 사용자 정보가 일치하지 않을 때
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
}
