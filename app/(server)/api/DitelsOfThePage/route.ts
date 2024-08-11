import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";


dbConnect

export async function POST(req:NextRequest) {
    try {
     
      const data = await req.json(); // Parse the request body
      const newWedding = new DetelsOfThePageSchema(data); // Create a new Wedding document
      await newWedding.save(); // Save the document to the database
      return NextResponse.json({ status: 201, success: true, wedding: newWedding });
    } catch (error:any) {
      return NextResponse.json({ message: error.message, status: 400 });
    }
  }