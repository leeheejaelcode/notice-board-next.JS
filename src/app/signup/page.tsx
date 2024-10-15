"use client";

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
        <div>
          <label htmlFor="userId"></label>
          <input
            type="text"
            name="userId"
            id="userId"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="아이디"
          />
        </div>
        <div>
          <label htmlFor="userPassword"></label>
          <input
            type="password"
            name="userPassword"
            id="userPassword"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="비밀번호"
          />
        </div>
        <button type="submit" className="rounded-md bg-slate-200 p-2 text-md">
          회원가입
        </button>
      </form>
    </div>
  );
}
