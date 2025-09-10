"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Button>
        <Link href="/user">用户管理</Link>
      </Button>

      <br />
      <Link href="/auth/register">注册</Link>
      <br />
      <Link href="/auth/login">登录</Link>
    </div>
  );
}
