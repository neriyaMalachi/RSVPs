import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "../../lib/mongodb";
import Guest from "../../models/Guest";
import path from "path";
import fs from "fs";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const AllGuests = await Guest.find();
    if (AllGuests) {
      const filePath = path.join(process.cwd(), "data", "Guests.json");
      console.log(filePath);
      
      fs.writeFileSync(filePath, JSON.stringify(AllGuests, null, 2), "utf8");

      return NextResponse.json({ status: 200, success: true });
    }
    return NextResponse.json({
      status: 500,
      message: "Guest with this email already exists",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 405 });
  }
}
