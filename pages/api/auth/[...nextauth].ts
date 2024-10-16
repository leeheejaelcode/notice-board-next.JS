import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_ID;
const clientSecret = process.env.GITHUB_SECRET;
const nextAuthSecret = process.env.NEXTAUTH_SECRET;

if (!clientId || !clientSecret || !nextAuthSecret) {
  throw new Error("Missing environment variables for NextAuth");
}

export const authOptions = {
  providers: [
    GithubProvider({
      // login방식을 provider라고 합니다.
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  secret: nextAuthSecret,
};
export default NextAuth(authOptions);

// 지금쓰는 라이브러리(NEXTAUTH)에서 별도에 셋팅이 없으면 기본이 JWT 방식입니다.
