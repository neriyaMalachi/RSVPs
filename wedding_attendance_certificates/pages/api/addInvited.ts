// pages/api/add.js
import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/mongodb";

export default async function POST(req: NextRequest, res: NextResponse) {
  try {
    const requestBody = await req.body;
    const newInvited = requestBody
    console.log(requestBody);
    dbConnect();
  } catch (error: any) {
    console.log("Error in route: ", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
