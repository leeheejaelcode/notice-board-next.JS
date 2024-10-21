"use client";

import { useEffect, useState } from "react";

interface LoginProps {
  setUser: (user: any) => void; // setUser의 타입을 정의
}

export default function Login({ setUser }: LoginProps) {
  const submitBtn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = document.querySelector("#userId") as HTMLInputElement;
    const password = document.querySelector(
      "#userPassword"
    ) as HTMLInputElement;

    if (id.value === "" || password.value === "") {
      alert("아이디와 비밀번호를 입력해주세요");
      return;
    }

    // 로그인 API 호출 (예시)
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: id.value,
        userPassword: password.value,
      }),
    });

    const userData = await response.json();
    if (response.ok) {
      setUser(userData); // 로그인 성공 시 setUser 호출
    } else {
      alert("로그인 실패");
    }
  };

  return (
    <div className="p-10">
      <h1 className="font-bold mb-3">로그인</h1>
      <form onSubmit={submitBtn} className="flex flex-col gap-3">
        <div>
          <label htmlFor="userId" className="sr-only"></label>
          <input
            type="text"
            id="userId"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="아이디"
          />
        </div>
        <div>
          <label htmlFor="userPassword" className="sr-only"></label>
          <input
            type="password"
            id="userPassword"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="비밀번호"
          />
        </div>
        <button type="submit" className="rounded-md bg-slate-200 p-2 text-md">
          로그인
        </button>
      </form>
    </div>
  );
}
