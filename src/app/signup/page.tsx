"use client";

import Input from "@/component/input";

export default function Signup() {
  const submitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    const id = document.querySelector("#userId") as HTMLInputElement;
    const password = document.querySelector(
      "#userPassword"
    ) as HTMLInputElement;
    if (id.value === "" || password.value === "") {
      alert("아이디와 비밀번호를 입력해주세요");
      e.preventDefault();
    }
  };

  return (
    <div className="p-10 ">
      <h1 className="font-bold mb-3">회원가입</h1>
      <form
        action="/api/signup"
        method="post"
        onSubmit={submitBtn}
        className="flex flex-col gap-3">
        <Input name="userName" label="이름" />
        <Input name="userId" label="아이디" />
        <Input type="password" name="userPassword" label="비밀번호" />
        <button type="submit" className="rounded-md bg-slate-200 p-2 text-md">
          회원가입
        </button>
      </form>
    </div>
  );
}
