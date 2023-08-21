import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import sendgrid from "@sendgrid/mail";

sendgrid.setApiKey(process.env.EMAIL_API_KEY);

export async function POST(request: NextRequest) {
  const data = await request.json();
  // Prepare attachments array
  const attachments = [];

  if (data?.resume) {
    attachments.push({
      content: data.resume,
      filename: "resume.pdf", // or any other naming convention you prefer
      type: "application/pdf",
      disposition: "attachment",
    });
  }

  if (data?.cover_letter) {
    attachments.push({
      content: data.cover_letter,
      filename: "cover_letter.pdf",
      type: "application/pdf",
      disposition: "attachment",
    });
  }

  try {
    const msg = {
      to: process.env.SENDGRID_EMAIL_TO,
      from: process.env.SENDGRID_EMAIL_FROM,
      replyTo: data?.email,
      subject: "Job Application",
      text: "Text",
      html: `<div>
      <p>You've got a new Job Application from ${data?.name}, their father's name is: ${data?.father_name}. Their email address is: ${data?.email}, their number is ${data?.phone}. Their current Address is ${data.current_address} and permanent address is ${data.permanent_address}.</p>
      <p><span>Selected Department:</span> ${data.department} </p>
     `,
      attachments: attachments, // Add attachments to the SendGrid message
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
