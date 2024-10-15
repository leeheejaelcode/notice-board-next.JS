"use client";

import { useRouter } from "next/navigation";

export default function DetailLink() {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push("/");
      }}>
      버튼
    </button>
  );
}

// useRouter의 기능
// 1. 페이지 전환 기능
// 2. 뒤로가기 기능 router.back()
// 3. 앞으로가기 기능 router.forward()
// 4. 새로고침 기능 router.refresh() // 바뀐내용만 새로고침.
// 5. 페이지 미리로드 기능 router.prefetch()

// useRouter는 client component에서만 사용이 가능하지만 server component에서 사용하려면?
// client component를 만들고 그 컴포넌트를 server component안에서 사용하기

// Link태그에도 prefetch 기능이 내장되어있습니다.
// prefetch 기능을 끄고싶을땐 <Link prefetch={false}/>
// prefetch 기능은 개발중일땐 확인 불가

// 현재 url 출력 usePathname()
// search parameter 출력은 useSearchParams() 다른말로 쿼리스트링이라 부름
// 유저가 [dynamic route] 입력한거 출력은 useParams()
