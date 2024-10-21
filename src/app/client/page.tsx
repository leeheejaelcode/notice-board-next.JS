"use client";

import Input from "@/component/input";
import { handleSubmit } from "./actions";

export default function Write2() {
  return (
    <div className="p-10 ">
      <h1 className="font-bold mb-3">
        클라이언트 컴포넌트에서 actions 기능 구현해보기
      </h1>
      <form action={handleSubmit} className="flex flex-col gap-3">
        <Input name="title" label="제목" />
        <Input name="content" label="컨텐츠" />
        <button type="submit" className="rounded-md bg-slate-200 p-2 text-md">
          글 발행
        </button>
      </form>
    </div>
  );
}

// 클라이언트 컴포넌트에서 actions 기능 구현하기
// "use client" 정의
// 같은 폴더 안에 actions.ts작성
// import 해서 사용하기
