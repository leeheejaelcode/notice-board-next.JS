"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function Comment() {
  // useParams를 사용해서 id값 가져오기
  const params = useParams();
  const id = params?.id;
  const [comment, setComment] = useState("");

  if (!id) return;

  const getComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };
  // 유저한테 id를 받는 방법
  // body로 객체 전달하기
  const sentComment = () => {
    fetch(`/api/post/comment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        comment: comment,
        parent: id,
      }),
    });
    return;
  };

  return (
    <div>
      <div>
        <p>댓글목록보여줄부분</p>
      </div>
      <input
        type="text"
        className="border border-solid border-black p-2"
        onChange={(e) => {
          getComment(e);
        }}
      />
      <button
        type="button"
        className="bg-slate-300 p-2 rounded-md"
        onClick={sentComment}>
        댓글 전송
      </button>
    </div>
  );
}
