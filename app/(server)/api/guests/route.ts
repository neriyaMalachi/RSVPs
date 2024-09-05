import { dbConnect } from "@/app/(server)/lib/mongodb";
import Guest from "@/app/(server)/models/Guest";
import { NextRequest, NextResponse } from "next/server";
import sendRegistrationSuccessEmail from "../../nodemailer/SendMail";
require("@/app/(server)/models/Guest");

dbConnect();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    await dbConnect();
    const guests = await Guest.find();
    return NextResponse.json({ success: true, guests });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      status: 400,
      message: error.message,
    });
  }
}

export async function POST(req: NextRequest, res: NextResponse) {
 await dbConnect();
  const data = await req.json();

  try {
    const existingGuest = await Guest.findOne({ email: data.email });
    if (existingGuest) {
      return NextResponse.json({
        status: 400,
        message: "Guest with this email already exists",
      });
    }
    await Guest.create(data);
    // sendRegistrationSuccessEmail(data.email);
    return NextResponse.json({ status: 201, success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 404 });
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
    return NextResponse.json({
      message: "successfull",
      status: 200,
      data: NewGusts,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}

export async function DELETE(req: NextRequest, res: NextResponse) {
  const DeleteGusts = await req.json();
  console.log("data: ", DeleteGusts);
  try {
    await dbConnect();
    const result = await Guest.findByIdAndDelete(DeleteGusts.id);
    console.log(result);

    if (result.deletedCount === 0) {
      return NextResponse.json({ message: "Guest not found", status: 404 });
    }
    return NextResponse.json({
      message: "Deleted Successfull",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}

// function generateGuestData() {
//   return {
//     name: faker.person.fullName(),
//     email: faker.internet.email(),
//     phone: faker.phone.number(),
//     guests: faker.number.int({ min: 1, max: 5 }),
//     attending: faker.datatype.boolean(),
//     side: faker.helpers.arrayElement(['bride', 'groom']),
//     notes: faker.lorem.sentence(),
//   };
// }
// otomation for add 1000 gusts
// let usersAdded = 0;
//   for (let i = 0; i < 1000; i++) {
//     const guestData = generateGuestData();
//     const guest = new Guest(guestData);

//     try {
//       await guest.save();
//       usersAdded++;
//     } catch (err:any) {
//       console.error(`Error adding user ${i + 1}:`, err.message);
//     }
//   }
//       return NextResponse.json({ status: 201, success: true });
