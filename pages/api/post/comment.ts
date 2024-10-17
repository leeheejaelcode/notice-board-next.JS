import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      console.log("로그인 상태가 아닙니다.");
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const data = {
        parent: new ObjectId(req.body.parent),
        email: session?.user?.email,
        comment: req.body.comment,
      };
      await db.collection("comment").insertOne(data);
      return res.status(200).json({ message: "Comment inserted successfully" });
    } catch (error) {
      console.error("Error inserting comment:", error);
      return res.status(500).json({ message: "Error inserting comment" });
    }
  } else {
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
