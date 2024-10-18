"use client";
export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  console.log(error, reset);
  return (
    <div>
      <h1>에러페이지 입니다</h1>
      <button type="button" onClick={() => reset()}>
        다시 시도
      </button>
    </div>
  );
}

// error 컴포넌트
// 무조건 use client를 선언해줘서 클라이언트 컴포넌트로 사용해야 합니다.
// 전체페이지에서 에러를 보여주는것이 아닌 페이지별로 에러를 보여줍니다 하지만 상위 폴더에 작성을 하게되면 상위 폴더안에 있는 error를 보여주게 됩니다.
// layout.js 에러는 체크하지 못합니다. 체크하기 위해서는 global-error.js를 만들면 최상위 layout.js 에러를 체크할 수 있습니다.
