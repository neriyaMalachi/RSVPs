import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import DetelsOfThePageSchema from "@/app/(server)/models/DitelsOfThePage";

export async function PUT(req: NextRequest) {
  const id = "66b89c23b7c8b5d24673ac6e";
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
  const id = "66b89c23b7c8b5d24673ac6e";

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
