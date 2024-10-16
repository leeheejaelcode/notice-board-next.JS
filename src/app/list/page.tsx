import { connectDB } from "@/util/database";
import ListItem from "./ListItem";
// static렌더링과 dynamic렌더링
// static 렌더링은 pnpm build 할 때 만든 html페이지 그대로 유저에게 보냅니다.
// dynamic 렌더링은 유저가 페이지에 접속할때 마다 html을 새로 만들어서 보내줍니다.

// 예약된 변수명 dynamic
// 이 페이지를 보여줄때 dynamic렌더링을해서 보여줍니다.
export const dynamic = "force-dynamic"; // force-static로 설정하면 static렌더링을 해서 보여줍니다.
export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();
  return (
    <div className="bg-[rgb(249,250,255)] p-[10px] h-screen">
      <ListItem result={result} />
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
