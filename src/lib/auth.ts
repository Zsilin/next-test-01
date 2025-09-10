import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "@/db"; // your drizzle instance
import { user, session, account, verification } from "@/db/schema";
import { sendEmail } from "@/mail";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      // 发送验证邮件
      console.log(`发送验证邮件到 ${user.email}: ${url}`);
      // 这里的 url 会包含 callbackURL 参数
      await sendEmail(user.email, "验证邮件", `点击邮件进行验证${url}`);
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },

    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!, // Google应用客户端ID
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!, // Google应用客户端密钥
    },
  },
});
