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
/*                                    쿼리스트링                                   */
/* -------------------------------------------------------------------------- */
// fetch 통신을 할때 보낼 서버 api에다가 ?데이터이름=데이터를 넣어주게 되면 데이터가 함께 보내집니다.
// 데이터를 여러개 보낼때에는 &를 사용해 줍니다.
