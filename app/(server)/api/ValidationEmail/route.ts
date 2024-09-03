// import { COOKIE_NAME } from "@/constants";
// import { serialize } from "cookie";
import { sign } from "jsonwebtoken";

export async function GET(req: Request, res: Response) {
    console.log("ddd");
   
    const data = await req.json();
    console.log("ddd",data);
  
  const secret = process.env.JWT_SECRET || "";

//   if (
//     data.email === "n@gmail.com"
//   ) {
    // const token = sign({ data }, secret, { expiresIn: 60 * 60 });

    // const seralized = serialize(COOKIE_NAME, token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "strict",
    //   maxAge: 60 * 60,
    //   path: "/",
    // });
    // const response = {
    //   message: "Authenticated!",
    // };

    // return new Response(JSON.stringify(response), {
    //   status: 200,
    //   headers: { "Set-Cookie": seralized },
    // });
//   } else {
//     return Response.json(
//       { message: "error in server the email or password not valid !!!" },
//       { status: 401 }
//     );
//   }
}