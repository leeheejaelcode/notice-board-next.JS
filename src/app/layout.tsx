import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import LoginBtn from "./LoginBtn";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import LogoutBtn from "./LogoutBtn";
import { cookies } from "next/headers";
import DarkModeButton from "./DarkModeButton";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  const darkModeValue = cookies().get("darkMode")?.value;

  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${
          darkModeValue === "true"
            ? "bg-black text-white"
            : "bg-white text-black"
        }`}>
        <nav className="bg-slate-300 p-5 flex gap-3 items-center">
          <Link
            href="/"
            className={`${
              darkModeValue === "true" ? "text-white" : "text-black"
            }`}>
            Home
          </Link>
          <Link
            href="/list"
            className={`${
              darkModeValue === "true" ? "text-white" : "text-black"
            }`}>
            List
          </Link>
          <Link
            href="/write"
            className={`${
              darkModeValue === "true" ? "text-white" : "text-black"
            }`}>
            Write
          </Link>
          <DarkModeButton darkModeValue={darkModeValue} />
          {session ? (
            <>
              <p>{session?.user?.name}</p>
              <LogoutBtn />
            </>
          ) : (
            <LoginBtn />
          )}
        </nav>
        {children}
      </body>
    </html>
  );
}
