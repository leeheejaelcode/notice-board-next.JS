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
    <div className="p-10 ">
      <h1 className="font-bold mb-3">글작성</h1>
      <form
        action="/api/post/new"
        method="post"
        onSubmit={submitBtn}
        className="flex flex-col gap-3">
        <div>
          <label htmlFor="title"></label>
          <input
            type="text"
            name="title"
            id="title"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="제목"
          />
        </div>
        <div>
          <label htmlFor="content"></label>
          <input
            type="text"
            name="content"
            id="content"
            className="border border-solid border-black p-[10px] w-full"
            placeholder="내용"
          />
        </div>
        <button type="submit" className="rounded-md bg-slate-200 p-2 text-md">
          글 발행
        </button>
      </form>
    </div>
  );
}
