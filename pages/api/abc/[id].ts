import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = (await connectDB).db("forum");
  // 쿼리에서 id 가져오기
  const id = req.query.id;

  // id가 없거나 string 타입이 아닐 경우 에러 처리
  if (!id || typeof id !== "string") {
    return res.status(400).json({ message: "Invalid ID" });
  }

  try {
    // MongoDB에서 _id를 ObjectId로 변환하여 삭제
    await db.collection("post").deleteOne({ _id: new ObjectId(id) });

    // 삭제 성공 시 200 OK 응답
    return res.status(200).redirect(302, "/list");
  } catch (error) {
    console.error("Error deleting post:", error);
    // 삭제 실패 시 500 Internal Server Error 응답
    return res.status(500).json({ message: "Error deleting post" });
  }
}

/* -------------------------------------------------------------------------- */
/*                                 URL 파라미터 문법                                */
/* -------------------------------------------------------------------------- */
// /api/abc/[작명].ts 로 짓게되면 {'작명' : 'kim'}으로 정보가 넘어갑니다.
// 받을때에는 req.query.작명으로 사용이 가능합니다.
