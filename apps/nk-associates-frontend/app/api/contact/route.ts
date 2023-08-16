import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.EMAIL_API_KEY);

export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    const msg = {
      to: process.env.NEXT_SENDGRID_EMAIL_TO,
      from: process.env.NEXT_SENDGRID_EMAIL_FROM,
      replyTo: data?.email,
      subject: data.subject,
      body: data.message,
      html: `<div>
      <p>You've got a new mail from ${data.name}, their email is: ${data.email}, their number is ${data?.phone} </p>
      <p><span>Selected Category:</span> ${data.category} </p>
      ${data.message}</div>`,
    };
    const res = await sendgrid.send(msg);
    return NextResponse.json(res[0].statusCode);
  } catch (error) {
    console.error("error", error.message);
    return NextResponse.json(
      { message: error.message },
      { status: error?.code || 400 },
    );
  }
}
