import { Resend } from "resend";

let resendInstance: Resend | null = null;

function getResendInstance() {
  if (!resendInstance) {
    resendInstance = new Resend(process.env.RESEND_API_KEY);
  }
  return resendInstance;
}

export async function sendEmail(to: string, subject: string, html: string) {
  const resend = getResendInstance();
  try {
    const response = await resend.emails.send({
      from: "noreply@zhusilin.xyz",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
