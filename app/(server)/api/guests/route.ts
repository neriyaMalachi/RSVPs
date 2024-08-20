// pages/api/add.js
import { dbConnect } from "@/lib/mongodb";
import Guest from "@/app/(server)/models/Guest";
import { NextRequest, NextResponse } from "next/server";
import { faker } from '@faker-js/faker'; 
require("@/app/(server)/models/Guest");

dbConnect();


function generateGuestData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    guests: faker.number.int({ min: 1, max: 5 }),
    attending: faker.datatype.boolean(),
    side: faker.helpers.arrayElement(['bride', 'groom']),
    notes: faker.lorem.sentence(),
  };
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
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
  dbConnect();
  const data = await req.json();
  try {
    const guest = await Guest.create(data);
    return NextResponse.json({ status: 201, success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}

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