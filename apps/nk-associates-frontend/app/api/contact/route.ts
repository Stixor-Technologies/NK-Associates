import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import sendgrid from "@sendgrid/mail";
import { EMAIL_API } from "../../../utils/constants";

sendgrid.setApiKey(EMAIL_API);

export async function POST(request: NextRequest) {
  const data = await request.json();
  console.log(data)
  const msg = {
    to: data.email, 
    
    // Change this to your verified sender
    from: "fawad.mehmood@stixor.com", 
    subject: "This is dummy email and sent via sendgrid",
    body: data.message,
    html: `<div>You've got a mail</div>`,
  };

  console.log("first")
  try {
      // console.log("REQ.BODY", req.body);
       const res = await sendgrid.send(msg);
      //  return res;
       return NextResponse.json(res)
    } catch (error) {
      console.log(error);
  }

//   sendgrid
//     .send(msg)
//     .then(() => {
//       console.log("Email sent");
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }


// export async function GET(req: NextRequest) {
//     return new Response("This is a new API route");
//   }

}
