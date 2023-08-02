import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import sendgrid from "@sendgrid/mail";
import { EMAIL_API } from "../../../utils/constants";

sendgrid.setApiKey(EMAIL_API);

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data);
  const msg = {
    to: data.email,
    // Change this to your verified sender
    from: "fawad.mehmood@stixor.com",
    subject: "This is dummy email and sent via sendgrid",
    body: data.message,
    html: `<div>${data.message}</div>`,
  };

  console.log("first");
  try {
    const res = await sendgrid.send(msg);
    if (res[0]?.statusCode !== 202) {
      return NextResponse.json({message: 'Email has been sent'});
    } else {
      return NextResponse.json({ message: "Error sending email" });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Error sending email" });
  }
}
