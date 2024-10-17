"use client";

import Link from "next/link";
import DetailLink from "./DetailLink";

interface ListItemProps {
  _id: string;
  title: string;
  content: string;
  author: string;
}

export default function ListItem({ result }: { result: ListItemProps[] }) {
  const handleDelete = (i: number, id: string) => {
    const items = Array.from(document.querySelectorAll("[data-id]"));
    const targetElement = items[i];

    /* -------------------------------------------------------------------------- */
    /*                               fetch의 body 문법                               */
    /* -------------------------------------------------------------------------- */

    fetch(`/api/post/delete/${id}`, {
      method: "DELETE",
    }).then(() => {
      if (targetElement) {
        targetElement.classList.add("opacity-0");
        setTimeout(() => {
          targetElement.remove();
        }, 1000);
      }
    });

    /* -------------------------------------------------------------------------- */
    /*                                    쿼리스트링                                   */
    /* -------------------------------------------------------------------------- */
    // fetch 통신을 할때 보낼 서버 api에다가 ?데이터이름=데이터를 넣어주게 되면 데이터가 함께 보내집니다.
    // 데이터를 여러개 보낼때에는 &를 사용해 줍니다.

    // fetch(`/api/queryString?id=${id}`).then(() => {
    //   if (targetElement) {
    //     targetElement.classList.add("opacity-0");
    //     setTimeout(() => {
    //       targetElement.remove();
    //     }, 1000);
    //   }
    // });

    /* -------------------------------------------------------------------------- */
    /*                                 URL 파라미터 문법                                */
    /* -------------------------------------------------------------------------- */
    // /api/abc/[작명].ts 로 짓게되면 {'작명' : 'kim'}으로 정보가 넘어갑니다.
    // 받을때에는 req.query.작명으로 사용이 가능합니다.

    // fetch(`/api/abc/${id}`).then(() => {
    //   if (targetElement) {
    //     targetElement.classList.add("opacity-0");
    //     setTimeout(() => {
    //       targetElement.remove();
    //     }, 1000);
    //   }
    // });
  };

  return (
    <div>
      {result.map((item, i) => {
        return (
          <div
            className={`bg-white rounded-[10px] p-[20px] mb-[5px] shadow-[0_2px_4px_0px_rgb(224,224,224)] transition-opacity duration-1000 
            `}
            key={item._id}
            data-id={item._id}>
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
                handleDelete(i, item._id);
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
