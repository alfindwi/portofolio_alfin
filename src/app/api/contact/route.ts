import { NextResponse } from "next/server";
import { Resend } from "resend";
import ContactEmail from "../emails/contactEmail";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Contact Form <ZxRZS@example.com>",
      to: "alfindwi190@gmail.com",
      subject: `Contact Form Submission ${name}`,
      react: ContactEmail({ name, email, message }),
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
