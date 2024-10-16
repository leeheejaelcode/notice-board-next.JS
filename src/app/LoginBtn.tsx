"use client";

import { signIn } from "next-auth/react";

export default function LoginBtn() {
  return (
    <a
      className="text-white bg-slate-700 rounded-md p-2 cursor-pointer"
      type="button"
      onClick={() => {
        signIn();
      }}>
      Login
    </a>
  );
}

// github를 통해서 로그인하기
