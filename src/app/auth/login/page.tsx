"use client";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log("onRequest");
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log("onSuccess");
        },
        onError: (ctx) => {
          // display the error message
          console.log(ctx);
        },
      }
    );
  };
  return (
    <div>
      {/* 登录表单 */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="name" name="name" />
        <input type="text" placeholder="email" name="email" />
        <input type="password" placeholder="password" name="password" />
        <button type="submit">登录</button>
      </form>
    </div>
  );
}
