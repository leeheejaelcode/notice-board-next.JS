import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    try {
      const { title, content } = req.body;
      const id = req.query.id;
      await db
        .collection("post")
        .updateOne(
          { _id: new ObjectId(id as string) },
          { $set: { title, content } }
        );
      return res.status(200).redirect(302, "/list");
    } catch (error) {
      console.error(error);
      return res.status(500).redirect(302, "/error");
    }
  }
}
