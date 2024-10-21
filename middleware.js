import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const session = await getToken({ req: request });
  if (request.nextUrl.pathname.startsWith("/list")) {
    console.log(new Date().toLocaleString());
    return NextResponse.next();
  }

  // 로그인이 안된 유저의 write 페이지로 이동 막는 방법 단 조건이 있음
  // 1. env 파일에 NEXTAUTH_SECRET 키가 있어야합니다
  // 2. JWT 방식을 사용하는 경우에만 출력이 가능합니다.
  if (request.nextUrl.pathname.startsWith("/write")) {
    if (session == null) {
      return NextResponse.redirect(
        new URL("http://localhost:3000/api/auth/signin", request.url)
      );
    }
    return NextResponse.next();
  }

  request.cookies.get("쿠키이름"); //출력
  request.cookies.has("쿠키이름"); //존재확인
  request.cookies.delete("쿠키이름"); //삭제

  // 쿠키를 생성하고 보내주기
  if (request.nextUrl.pathname.startsWith("/register")) {
    const cookie = request.cookies.has("visited");
    if (cookie) {
      return NextResponse.next();
      // return NextResponse.redirect(
      //   new URL("http://localhost:3000/", request.url)
      // );
    } else {
      const response = NextResponse.next();
      response.cookies.set({
        name: "visited",
        value: "true",
        maxAge: 3600,
        httpOnly: true, // 유저가 자바스크립트로 쿠키조작 방지 기능
      });
      return response;
    }

    // 애초에 write 페이지에서 구현하면 되는데 왜 middleware에서 하는건가요?
    // 막고싶은 페이지들이 많으면 middleware에서 관리하는게 더 편합니다.

    // session 쓸 경우
    // session 정보 들어있는 쿠키를 출력해보고 그게 DB에 있나 조회 해야합니다.

    // console.log(request.nextUrl); //유저가 요청중인 URL 출력해줌
    // console.log(request.cookies); //유저가 보낸 쿠키 출력해줌
    // console.log(request.headers); //유저의 headers 정보 출력해줌
    // NextResponse.next()  //통과
    // NextResponse.redirect(); // 다른페이지로 강제이동 (주소창도 변경)
    // NextResponse.rewrite(); //  다른페이지로 강제이동 (주소창은 유지)
  }
}
