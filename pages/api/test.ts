import { connectDB } from "@/util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // 누가 /api/test로 GET/POST/PUT/DELETE/PATCH 요청하면 여기 코드를 실행시켜줍니다.
  if (req.method === "POST") {
    console.log(req.body);
    return res.status(200).json(req.body);
  }

  if (req.method === "GET") {
    const db = (await connectDB).db("forum");
    const result = await db.collection("post").find().toArray();
    return res.status(200).json(result);
  }

  console.log(req.query);
}

// 서버기능 처리 성공시엔 status(200)
// 서버기능 처리 실패시엔 status(500)
// 서버기능 처리 실패시(유저잘못) status(400)

// query string 장점
// 간단함, GET요청으로도 데이터 전송이 가능합니다.
// query string으로 받은 자료들은 req.query로 받을 수 있습니다.

// query string 단점
// 데이터가 많으면 더럽습니다.
// URL에 데이터가 노출이 되기때문에 보안에 위험이 있습니다.
