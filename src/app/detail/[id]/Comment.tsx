"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Comments {
  [key: string]: string;
}

export default function Comment() {
  const params = useParams();
  const id = params?.id;
  const [comment, setComment] = useState<string>();
  const [comments, setComments] = useState<Comments[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    if (!id) return;

    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/post/comment?id=${id}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setComments(data);
        // 댓글 목록을 가져온 후 각 댓글의 좋아요 수를 가져오는 함수 호출
        data.forEach(async (comment: Comments) => {
          const likeResponse = await fetch(
            `/api/post/commentLike?commentId=${comment._id}`
          );
          const likeData = await likeResponse.json();
          setLikeCounts((prev) => ({
            ...prev,
            [comment._id]: likeData.likeCount,
          }));
        });
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [id]);

  const getComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") return;
    setComment(e.target.value);
  };

  // 유저한테 id를 받는 방법
  // body로 객체 전달하기
  const sentComment = async () => {
    if (!comment) return;
    try {
      const response = await fetch("/api/post/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          comment: comment,
          parent: id,
        }),
      });
      if (response.ok) {
        setComment("");
        const data = await response.json();
        setComments(data);
      } else {
        console.error("Error adding comment");
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const likeButton = async (commentId: string) => {
    try {
      await fetch(`/api/post/commentLike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ commentId }),
      });

      // 좋아요를 누르면 좋아요 수를 다시 가져오기
      const likeResponse = await fetch(
        `/api/post/commentLike?commentId=${commentId}`
      );
      const likeData = await likeResponse.json();
      setLikeCounts((prev) => ({
        ...prev,
        [commentId]: likeData.likeCount,
      }));
    } catch (error) {
      console.error("Error liking comment:", error);
    }
  };

  return (
    <div className="px-5">
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
      <div>
        <ul>
          {comments.length !== 0 ? (
            comments.map((c) => (
              <li key={c._id} className="flex">
                <p>
                  {c.name ? (
                    <strong>{c.name}</strong>
                  ) : (
                    <strong>{c.email}</strong>
                  )}{" "}
                  : {c.comment}
                </p>
                <div>
                  <button
                    type="button"
                    className="border border-solid border-black"
                    onClick={() => {
                      likeButton(c._id);
                    }}>
                    👍
                  </button>
                  <span>{likeCounts[c._id] || 0}</span> {/* 좋아요 수 출력 */}
                </div>
              </li>
            ))
          ) : (
            <p>댓글이 없습니다.</p>
          )}
        </ul>
      </div>
    </div>
  );
}
