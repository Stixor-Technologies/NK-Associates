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
    subject: "This is dummy email and sent via sendgrid",
    body: data.message,
    html: `<div>
    <h3>You've got a new mail from ${data.name}, their email is: ${data.email}, their number is ${data?.phone}, category: ${data.category} </h3>
    ${data.message}</div>`,
  };

  try {
    const res = await sendgrid.send(msg);
    if (res[0]?.statusCode === 202) {
      return NextResponse.json({ message: "Email has been sent" });
    } else {
      return NextResponse.json({ message: "Error sending email" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error sending email" });
  }
}
