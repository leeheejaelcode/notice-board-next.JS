"use client";

export default function Write() {
  const submitBtn = (e: React.FormEvent<HTMLFormElement>) => {
    const title = document.getElementById("title") as HTMLInputElement;
    const content = document.getElementById("content") as HTMLInputElement;
    if (title.value === "" || content.value === "") {
      alert("제목와 내용을 입력하십시오.");
      e.preventDefault();
    }
  };

  return (
    <div className="p-10">
      <h1 className="mb-5 font-bold">글작성</h1>
      <form action="/api/post/new" method="post" onSubmit={submitBtn}>
        <label htmlFor="title">제목</label>
        <div>
          <input
            type="text"
            name="title"
            id="title"
            className="border border-solid border-black p-[20px]"
          />
        </div>
        <label htmlFor="content">내용</label>
        <div>
          <input
            type="text"
            name="content"
            id="content"
            className="border border-solid border-black p-[20px]"
          />
        </div>
        <button type="submit" className="rounded-md bg-slate-300 p-2">
          글 발행
        </button>
      </form>
    </div>
  );
}
