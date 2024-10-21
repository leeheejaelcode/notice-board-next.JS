"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function LoginLogoutButton({ session }: { session: any }) {
  return session ? (
    <>
      <Link href="/write">write</Link>
      <p>{session.user?.name}</p>
      <a
        className="text-white bg-slate-700 rounded-md p-2 cursor-pointer"
        onClick={() => signOut()}>
        Logout
      </a>
    </>
  ) : (
    <>
      {/* <Link href="/login">로그인</Link> */}
      {/* <Link href="/signup">회원가입</Link> */}
      <button
        type="button"
        className="text-white bg-slate-700 rounded-md p-2 cursor-pointer"
        onClick={() => {
          signIn();
        }}>
        Login
      </button>
    </>
  );
}
