export default function Write() {
  return (
    <div>
      <h1>글작성</h1>
      <form action="/api/test" method="post">
        <label htmlFor="title">제목</label>
        <input
          type="text"
          name="title"
          id="title"
          className="border border-solid border-black"
        />
        <label htmlFor="content">내용</label>
        <input
          type="text"
          name="content"
          id="content"
          className="border border-solid border-black"
        />
        <button type="submit">글 발행</button>
      </form>
    </div>
  );
}
