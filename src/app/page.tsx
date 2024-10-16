import { connectDB } from "@/util/database";

export const revalidate = 60;

export default async function Home() {
  // GET요청 결과 캐싱하기
  await fetch("/URL", { cache: "force-cache" });
  // 사실은 await fetch("/url") 뒤에 cache 생략해도 캐싱이 가능합니다.
  // 실시간 데이터를 가져오게 하려면 {cache : "no-store"}
  // await fetch("/URL", {next : {revalidate : 60}}); 이러면 60초마다 캐싱된 데이터를 갱신해줍니다.

  const db = (await connectDB).db("forum");
  const result = await db.collection("post").find().toArray();

  /* -------------------------------------------------------------------------- */
  /*                             DB출력 결과 캐싱하는 방법 2가지                  */
  /* -------------------------------------------------------------------------- */

  // 1. DB를 서버 API로 만들고 fetch를 사용하는 방법
  // 2. revalidate 예약변수를 사용하면 페이지단위 캐싱이 가능합니다. // list2
  return <main>안녕</main>;
}
