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

    if (req.body.parent === "") {
      return res.status(400).json({ message: "Parent ID is required" });
    }

    if (req.body.email === "") {
      return res.status(400).json({ message: "email is required" });
    }

    try {
      const data = {
        comment: req.body.comment,
        parent: new ObjectId(req.body.parent),
        email: session?.user?.email,
        name: session?.user?.name,
      };
      await db.collection("comment").insertOne(data);
      const result = await db
        .collection("comment")
        .find({ parent: new ObjectId(req.body.parent) })
        .toArray();
      return res.status(200).json(result); // 데이터 반환
    } catch (error) {
      console.error("Error inserting comment:", error);
      return res.status(500).json({ message: "Error inserting comment" });
    }
  }

  if (req.method === "GET") {
    const db = (await connectDB).db("forum");
    const parentId = req.query.id; // 요청에서 부모 ID를 가져옵니다.

    if (!parentId || typeof parentId !== "string") {
      return res.status(400).json({ message: "Invalid Parent ID" });
    }

    try {
      const result = await db
        .collection("comment")
        .find({ parent: new ObjectId(parentId) })
        .toArray();
      return res.status(200).json(result); // 데이터 반환
    } catch (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({ message: "Error fetching comments" });
    }
  }
}
