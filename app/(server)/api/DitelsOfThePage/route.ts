import { dbConnect } from "@/app/(server)/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import DetelsOfThePageSchema from "@/app/(server)/models/DitelsOfThePage";

export async function PUT(req: NextRequest) {
  const id = "66b91c2fbc80906306b21597";
  const data = await req.json();
  try {
    await dbConnect();
    const NewDetels = await DetelsOfThePageSchema.updateOne(
      { _id: id },
      {
        BrideName: data.BrideName,
        GroomName: data.GroomName,
        Title: data.Title,
        Location: data.Location,
        Hour: data.Hour,
        Year: data.Year,
        Month: data.Month,
        Day: data.Day,
        Minute: data.Minute,
        Description: data.Description,
        img: data.img,
      }
    );
    if (!NewDetels) {
      return NextResponse.json({ message: "data not found" }, { status: 404 });
    }
    return NextResponse.json({
      status: 200,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 400 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  const id = "66b91c2fbc80906306b21597";
  try {
    await dbConnect();
    const detelsOfPage = await DetelsOfThePageSchema.findById(id);

    if (!detelsOfPage) {
      return NextResponse.json(
        { message: "detels not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "successfully",
      data: detelsOfPage,
      status: 200,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const data = await req.json();
    // Connect to the database
    await dbConnect();

    // Create a new document using the schema
    const newDetels = new DetelsOfThePageSchema({
      BrideName: data.BrideName,
      GroomName: data.GroomName,
      Title: data.Title,
      Location: data.Location,
      Hour: data.Hour,
      Year: data.Year,
      Month: data.Month,
      Day: data.Day,
      Minute: data.Minute,
      Description: data.Description,
      img: data.img,
    });

    // Save the new document to the database
    await newDetels.save();

    // Return a success response
    return NextResponse.json({
      message: "Document created successfully",
      data: newDetels,
      status: 201,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
