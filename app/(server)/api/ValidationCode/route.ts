import { NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const email =  req.body;
    // console.log("Received token:", token);
    console.log("Received code:", email);

  try {
    // אימות הטוקן והוצאת קוד האימות
    // const decoded = verify(token, process.env.JWT_SECRET || "");

    // if (decoded.verificationCode === code) {
    //   // יצירת טוקן גישה למשתמש
    //   const accessToken = sign({ email: decoded.email }, process.env.JWT_SECRET || '', { expiresIn: '30m' });

    //   res.status(200).json({ message: 'Verification successful', accessToken });
    // } else {
    //   res.status(401).json({ message: 'Invalid verification code' });
    // }
    return NextResponse.json({
        status: 200,
        message: 'Verification code sent',
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
}
