// pages/api/add.js
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/app/(server)/models/Guest";
import { NextRequest, NextResponse } from "next/server";

dbConnect();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const guests = await Guest.find({});
    return NextResponse.json({ success: true, data: guests });
  } catch (error) {
    return NextResponse.json({ success: false, status: 400 });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("iifdj",req.body);
  
  try {
    const guest = await Guest.create(req.body);
    console.log("eeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    return NextResponse.json({ status: 201, success: true });
  } catch (error) {
    return NextResponse.json({ message: error, status: 400 });
  }
}
