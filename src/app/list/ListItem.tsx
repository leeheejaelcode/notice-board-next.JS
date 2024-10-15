"use client";

import { WithId, Document } from "mongodb";
import Link from "next/link";
import DetailLink from "./DetailLink";

interface ListItemProps {
  _id: string;
  title: string;
  content: string;
}

export default function ListItem({ result }: { result: WithId<Document>[] }) {
  const items: ListItemProps[] = result.map((item) => ({
    _id: item._id.toString(),
    title: item.title ?? "Untitled", // title 필드가 없으면 기본값
    content: item.content ?? "No content available", // content 필드가 없으면 기본값
  }));

  const handleDelete = (id: string) => {
    fetch(`/api/post/delete/${id}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res + "삭제완료");
    });
  };

  return (
    <div>
      {items.map((item) => {
        return (
          <div
            className="bg-white rounded-[10px] p-[20px] mb-[5px] shadow-[0_2px_4px_0px_rgb(224,224,224)]"
            key={item._id}>
            <Link
              href={`/detail/${item._id}`}
              className="font-bold text-[20px]">
              <h4>{item.title}</h4>
            </Link>
            <DetailLink pageId={item._id} />
            <button
              type="button"
              title="삭제"
              onClick={() => {
                handleDelete(item._id);
              }}>
              🗑️
            </button>
            <p className="text-gray-400 my-[5px]">1월 1일</p>
          </div>
        );
      })}
    </div>
  );
}
