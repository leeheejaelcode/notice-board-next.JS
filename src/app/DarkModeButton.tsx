"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function DarkModeButton({
  darkModeValue,
}: {
  darkModeValue: string | undefined;
}) {
  const router = useRouter();
  const [darkModeIcon, setDarkModeIcon] = useState("🌙");

  useEffect(() => {
    // 쿠키 확인 및 초기 아이콘 설정
    const darkModeCookie = document.cookie.includes("darkMode");
    if (!darkModeCookie) {
      document.cookie = "darkMode=false; max-age=" + 3600 * 24;
    }

    // 현재 darkModeValue에 따라 아이콘 설정
    if (darkModeValue === "true") {
      setDarkModeIcon("🌞");
    } else {
      setDarkModeIcon("🌙");
    }
  }, [darkModeValue]);

  const setDarkMode = () => {
    if (darkModeValue === "true") {
      document.cookie = "darkMode=false; max-age=" + 3600 * 24;
      setDarkModeIcon("🌙");
    } else {
      document.cookie = "darkMode=true; max-age=" + 3600 * 24;
      setDarkModeIcon("🌞");
    }
    router.refresh(); // 페이지 새로고침
  };

  return (
    <button type="button" onClick={setDarkMode}>
      {darkModeIcon}
    </button>
  );
}
