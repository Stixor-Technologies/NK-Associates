import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import sendgrid from "@sendgrid/mail";
import { EMAIL_API, EMAIL_TO, EMAIL_FROM } from "../../../utils/constants";

sendgrid.setApiKey(EMAIL_API);

export async function POST(request: NextRequest) {
  const data = await request.json();
  const msg = {
    to: EMAIL_TO,
    from: EMAIL_FROM,
    replyTo: data?.email,
    subject: data.subject,
    body: data.message,
    html: `<div>
    <p>You've got a new mail from ${data.name}, their email is: ${data.email}, their number is ${data?.phone} </p>
    <p><span>Selected Category:</span> ${data.category} </p>
    ${data.message}</div>`,
  };

  try {
    const res = await sendgrid.send(msg);
    return NextResponse.json(res[0].statusCode);
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({ message: error });
  }
}
