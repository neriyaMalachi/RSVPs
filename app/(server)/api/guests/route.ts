import { dbConnect } from "@/app/(server)/lib/mongodb";
import Guest from "@/app/(server)/models/Guest";
import { NextRequest, NextResponse } from "next/server";
import sendRegistrationSuccessEmail from "../../nodemailer/SendMail";
require("@/app/(server)/models/Guest");

dbConnect();

// פונקציה להוספת כותרות CORS
function setCORSHeaders(res: NextResponse) {
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const guests = await Guest.find();

    const response = NextResponse.json({ success: true, guests });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  } catch (error: any) {
    const response = NextResponse.json({
      success: false,
      status: 400,
      message: error.message,
    });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
  await dbConnect();
  const data = await req.json();
  // sendRegistrationSuccessEmail(data.email);
  try {
    const existingGuest = await Guest.findOne({ email: data.email });
    if (existingGuest) {
      const response = NextResponse.json({
        status: 400,
        message: "Guest with this email already exists",
      });
      setCORSHeaders(response); // הוספת כותרות CORS לתגובה
      return response;
    }

    await Guest.create(data);
    const response = NextResponse.json({ status: 201, success: true });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  } catch (error: any) {
    const response = NextResponse.json({ message: error.message, status: 404 });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
  const data = await req.json();
  try {
    await dbConnect();
    const NewGusts = await Guest.updateOne(
      { _id: data._id },
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        guests: data.guests,
        attending: data.attending,
        side: data.side,
        notes: data.notes,
      }
    );

    const response = NextResponse.json({
      message: "successfull",
      status: 200,
      data: NewGusts,
    });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  } catch (error: any) {
    const response = NextResponse.json({ message: error.message, status: 400 });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const DeleteGusts = await req.json();
  try {
    await dbConnect();
    const result = await Guest.findByIdAndDelete(DeleteGusts.id);

    if (!result) {
      const response = NextResponse.json({
        message: "Guest not found",
        status: 404,
      });
      setCORSHeaders(response); // הוספת כותרות CORS לתגובה
      return response;
    }

    const response = NextResponse.json({
      message: "Deleted Successfull",
      status: 200,
    });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  } catch (error: any) {
    const response = NextResponse.json({ message: error.message, status: 400 });
    setCORSHeaders(response); // הוספת כותרות CORS לתגובה
    return response;
  }
}
