import { serialize } from "cookie";
import { verify } from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { token, code } = await req.json();

  console.log("Received code:", token, code);

  try {
    // אימות הטוקן והוצאת קוד האימות
    const decoded = verify(token.data, process.env.JWT_SECRET || "") as {
      verificationCode: string;
      email: string;
    };

    if (decoded.verificationCode === code) {
      // יצירת טוקן גישה למשתמש
      console.log("success");
      const accessToken = sign(
        { email: decoded.email },
        process.env.JWT_SECRET || "",
        {
          expiresIn: "5m",
        }
      );
      const serialized = serialize("accessToken", accessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60,
        path: "/",
      });
      const response = NextResponse.json({
        message: "Verification successful",
      });

      // הגדרת ה-Set-Cookie בעזרת headers
      response.headers.set("Set-Cookie", serialized);

      return response;
    } else {
      return NextResponse.json({
        status: 401,
        message: "Invalid verification code",
      });
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Something went wrong",
      error,
    });
  }
}
