import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookiesStore = cookies();
  
const cookie = process.env.COOKIE_NAME
  // const token = cookiesStore.get(cookie);

  // if (!token)
  //   return NextResponse.json(
  //     {
  //       message: "Unauthorized",
  //     },
  //     {
  //       status: 401,
  //     }
  //   );

//   const { value } = token;
//   const secret = process.env.JWT_SECRET || "";

//   try {
//     verify(value, secret);
//     const response = {
//       token: "Super Top Secret User",
//     };
//     return new Response(JSON.stringify(response), {
//       status: 200,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Something went wrong",
//       },
//       {
//         status: 400,
//       }
//     );
//   }
}
