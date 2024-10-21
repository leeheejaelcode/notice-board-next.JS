import Input from "@/component/input";
import { connectDB } from "@/util/database";
import { revalidatePath } from "next/cache";

export default async function Write2() {
  const db = (await connectDB).db("forum");
  const result = db.collection("post").find().toArray();

  async function handleSubmit(formData: FormData) {
    "use server";
    console.log(formData.get("title"));
    console.log(formData.get("content"));
    console.log("안녕 나는 서버 컴포넌트 actions 기능이야");

    const db = (await connectDB).db("forum");

    await db.collection("post").insertOne({
      title: formData.get("title"),
      content: formData.get("content"),
    });
    // revalidateTag(); // 특정 페이지 캐싱 삭제 기능인데 새로고침과 거의 유사합니다.
    revalidatePath("/server"); // 페이지를 무조건 재렌더링 하지않고 차이점만 렌더링 해줍니다.
  }

  return (
    <div className="p-10 ">
      <h1 className="font-bold mb-3">
        서버 컴포넌트에서 actions 기능 구현해보기
      </h1>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <Input name="title" label="제목" />
        <Input name="content" label="컨텐츠" />
        <button type="submit" className="rounded-md bg-slate-200 p-2 text-md">
          글 발행
        </button>
      </form>
      {result &&
        (await result).map(({ title }) => {
          return <p>글제목 : {title}</p>;
        })}
    </div>
  );
}

// 서버 컴포넌트에서 actions 기능 구현하기
// 컴포넌트 안에서 async function을 생성합니다.
// "use server" 정의하기

// actions의 문제점은 바로바로 새로고침이 되지 않습니다.
