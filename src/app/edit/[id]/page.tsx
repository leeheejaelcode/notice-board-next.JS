import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Edit({ params }: { params: { id: string } }) {
  const id = params.id;
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").findOne({ _id: new ObjectId(id) });

  return (
    <div className="p-10 ">
      <h1 className="font-bold mb-3">수정 페이지</h1>
      <form
        action={`/api/post/edit/${id}`}
        method="post"
        className="flex flex-col gap-3">
        <div>
          <label htmlFor="title" className="sr-only">
            제목
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="제목"
            defaultValue={result?.title}
          />
        </div>
        <div>
          <label htmlFor="content" className="sr-only">
            내용
          </label>
          <input
            type="text"
            name="content"
            id="content"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="내용"
            defaultValue={result?.content}
          />
        </div>
        <button type="submit" className="rounded-md bg-slate-200 p-2 text-md">
          수정하기
        </button>
      </form>
    </div>
  );
}
