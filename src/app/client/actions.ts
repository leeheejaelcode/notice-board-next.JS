"use server";

export async function handleSubmit(formData: FormData) {
  console.log(formData.get("title"));
  console.log(formData.get("content"));
  console.log("안녕 나는 클라이언트 컴포넌트 actions 기능이야");
}
