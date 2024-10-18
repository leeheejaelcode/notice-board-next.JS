import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const commentId = req.body.commentId as string;
  if (req.method === "POST") {
    const db = (await connectDB).db("forum");
    const session = await getServerSession(req, res, authOptions);

    if (!session) {
      console.log("로그인 상태가 아닙니다.");
      return res.status(401).json({ message: "Not authenticated" });
    }

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    try {
      // 사용자에 대한 기존 좋아요 조회
      const existingLike = await db.collection("commentLike").findOne({
        commentId,
        userId: session?.user?.email,
      });
      if (existingLike) {
        // 이미 좋아요를 누른 경우, 좋아요 제거
        await db.collection("commentLike").deleteOne({
          commentId,
          userId: session?.user?.email,
        });
        return res.status(200).json({ message: "Like removed" });
      } else {
        // 좋아요를 누르지 않은 경우, 좋아요 추가
        const data = {
          commentId,
          userId: session?.user?.email,
        };
        await db.collection("commentLike").insertOne(data);
      }
      return res.status(200).json({ message: "Like added" });
    } catch (error) {
      console.error("Error processing like:", error);
      return res.status(500).json({ message: "Error processing like" });
    }
  }

  if (req.method === "GET") {
    const db = (await connectDB).db("forum");
    const { commentId } = req.query; // req.body 대신 req.query에서 commentId 가져옴

    if (!commentId) {
      return res.status(400).json({ message: "Comment ID is required" });
    }

    try {
      // 해당 댓글에 대한 좋아요 수를 세기
      const likeCount = await db
        .collection("commentLike")
        .countDocuments({ commentId });

      return res.status(200).json({ likeCount }); // 좋아요 수 반환
    } catch (error) {
      console.error("Error fetching like count:", error);
      return res.status(500).json({ message: "Error fetching like count" });
    }
  }
}
