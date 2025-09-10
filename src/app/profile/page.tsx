"use client";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  console.log("session", session);
  return <div>ProfilePage</div>;
}
