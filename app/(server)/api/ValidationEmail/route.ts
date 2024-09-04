import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// פונקציה ליצירת קוד בן 4 ספרות
function generateVerificationCode() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// הגדרת תצורת SMTP
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_COMPANY,
    pass: process.env.PASS_COMPANY,
  },
});

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.json();

  const email = process.env.EMAIL || "";
  if (data.email === process.env.EMAIL_ADMIN) {
    // יצירת קוד אימות
    const verificationCode = generateVerificationCode();

    // שליחת הקוד לאימייל של המשתמש
    const mailOptions = {
      from: process.env.EMAIL_COMPANY,
      to: process.env.EMAIL_ADMIN,
      subject: "Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };

    try {
      await transporter.sendMail(mailOptions);

      // החתמה של קוד האימות בטוקן
      const token = sign(
        { verificationCode, email },
        process.env.JWT_SECRET || "",
        { expiresIn: "30m" }
      );

      return NextResponse.json({
        status: 200,
        message: "Verification code sent",
        data: token,
      });
    } catch (error) {
      return NextResponse.json({
        status: 500,
        message: "Failed to send email",
        error,
      });
    }
  } else {
    return NextResponse.json({
      status: 405,
      message: "Method not allowed",
    });
  }
}
