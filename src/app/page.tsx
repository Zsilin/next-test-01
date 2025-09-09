"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Link href="/user">用户管理</Link>
      <Link href="/auth/login">登录</Link>
    </div>
  );
}
