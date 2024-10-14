import { connectDB } from "@/util/database";
import Link from "next/link";

export default async function List() {
  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  return (
    <div className="bg-[rgb(249,250,255)] p-[10px] h-screen">
      {result.map((item) => {
        return (
          <div
            className="bg-white rounded-[10px] p-[20px] mb-[5px] shadow-[0_2px_4px_0px_rgb(,224,224)]"
            key={item._id.toString()}>
            <Link
              href={`/detail/${item._id}`}
              className="font-bold text-[20px]">
              {item.title}
            </Link>
            <p className="text-gray-400 my-[5px]">1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
