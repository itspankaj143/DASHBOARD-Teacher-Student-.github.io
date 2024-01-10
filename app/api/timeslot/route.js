import TimeSlot from "@/models/TimeSlot";
import { NextResponse } from "next/server";

TimeSlot.sync(); // Comment for sync() method

// Uncomment this line if you want to force sync
// TimeSlot.sync({ force: true });

// get all timeSlot
export async function GET(request) {
  try {
    const timeSlot = await TimeSlot.findAll();
    return NextResponse.json({ timeSlot }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e: e.message }, { status: 500 }); // Comment for error handling in GET method
  }
}

//create a timeslot
export async function POST(request) {
  try {
    const { name, title, dateTime, duration } = await request.json();
    await TimeSlot.create({
      name,
      title,
      dateTime,
      duration,
    });
    return NextResponse.json({ message: "TimeSlot Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 }); // Comment for error handling in POST method
  }
}
