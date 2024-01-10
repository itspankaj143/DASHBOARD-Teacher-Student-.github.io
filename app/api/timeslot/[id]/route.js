import TimeSlot from "@/models/TimeSlot";
import { NextResponse } from "next/server";

// Get timeslot using id
export async function GET(request) {
  const id = request.url.split("/timeslot/")[1];
  // console.log(id);
  try {
    const timeSlot = await TimeSlot.findOne({
      where: { id: id },
      // where: { id:request.params.id },
      // where:{
      //   id:{
      //     equals:parseInt(id)
      //   }
      // }
    });
    console.log(timeSlot);
    if (timeSlot) {
      return NextResponse.json({ timeSlot }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Timeslot not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update timeslot by id
export async function PUT(request) {
  try {
    const id = request.url.split("/timeslot/")[1];
    const { name, title, dateTime, duration } = await request.json();
    const updatedTimeslot = await TimeSlot.update(
      {
        name,
        title,
        dateTime,
        duration,
      },
      { where: { id: id } }
    );

    if (!updatedTimeslot) {
      throw new Error("Could not update timeslot");
    }

    return NextResponse.json(
      { message: "Timeslot Updated Successfully", updatedTimeslot },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Delete timeslot using id
export async function DELETE(request) {
  const id = request.url.split("/timeslot/")[1];
  try {
    const deltimeslot = await TimeSlot.destroy({ where: { id: id } });
    if (deltimeslot) {
      return NextResponse.json(
        { message: "Timeslot Deleted Successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Timeslot not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
