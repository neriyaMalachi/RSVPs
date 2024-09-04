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
      const accessToken = sign(
        { email: decoded.email },
        process.env.JWT_SECRET || "",
        { expiresIn: "30m" }
      );

      return NextResponse.json({
        status: 200,
        message: "Verification successful",
        accessToken,
      });
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
