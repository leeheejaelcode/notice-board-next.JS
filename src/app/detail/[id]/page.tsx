import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Comment from "./Comment";

export default async function Detail({ params }: { params: { id: string } }) {
  const { id } = params;
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").findOne({ _id: new ObjectId(id) }); // id 사용
  return (
    <div>
      <h2 className="font-bold text-[30px]">상세페이지</h2>
      <h4 className="font-bold text-[20px]">제목 : {result?.title}</h4>
      <p>내용 : {result?.content}</p>
      <Comment />
    </div>
  );
}

// dynamic route 문법
// dynamic route 만들려면: 예) /detail/[폴더명]/page.jsx 또는 page.tsx
// MongoDB에서 _id로 검색 시, ObjectId 변환이 필요함
// 예) const result = await db.collection('post').findOne({_id: new ObjectId(params.id)});

// props: 컴포넌트가 부모로부터 전달받는 값
// params: dynamic route에서 [폴더명]으로 지정된 부분에 유저가 입력한 값이 들어감
// 예) /detail/123에 접속하면 params.id는 '123'이 됨

// props.params는 list의 link 태그로 넘겨주면 됨.
