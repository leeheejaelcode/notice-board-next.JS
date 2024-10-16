import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    // 쿼리에서 id 가져오기
    const id = req.query.id;
    const session = await getServerSession(req, res, authOptions);
    // id가 없거나 string 타입이 아닐 경우 에러 처리
    if (!id || typeof id !== "string") {
      return res.status(400).json({ message: "Invalid ID" });
    }

    try {
      // 현재 user의 정보를 확인하고 그 user의 이메일이 일치하면 삭제시킴
      // const findUser = await db
      //   .collection("post")
      //   .findOne({ _id: new ObjectId(id) }); // 정상출력됨
      // if (findUser?.email === session?.user?.email) {
      // await db.collection("post").deleteOne({ _id: new ObjectId(id) });
      // }
      // 삭제 성공 시 200 OK 응답
      return res.status(200).redirect(302, "/list");
    } catch (error) {
      console.error("Error deleting post:", error);
      // 삭제 실패 시 500 Internal Server Error 응답
      return res.status(500).json({ message: "Error deleting post" });
    }
  } else {
    // DELETE 외의 다른 메서드로 요청할 경우 405 Method Not Allowed 응답
    return res.status(405).json({ message: "Method Not Allowed" });
  }
}
