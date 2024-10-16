"use client";

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  return (
    <a
      className="text-white bg-slate-700 rounded-md p-2 cursor-pointer"
      type="button"
      onClick={() => {
        signOut();
      }}>
      Logout
    </a>
  );
}

// github를 통해서 로그인하기
