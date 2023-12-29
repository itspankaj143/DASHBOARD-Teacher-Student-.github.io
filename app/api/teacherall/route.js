import Teacher from "@/models/Teacher_Schema";
import { NextResponse } from "next/server";
// import { getSession } from 'next-auth/client'; // Use appropriate authentication method
Teacher.sync();
// get all Teachers
export async function GET(request) {
  try {
    const teacher = await Teacher.findAll();
    return NextResponse.json({ teacher }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ e: e.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { id, FirstName, LastName, UserName, Password, Role } =
      await request.json();
    await Teacher.create({
      id,
      FirstName,
      LastName,
      UserName,
      Password,
      Role,
    });
    return NextResponse.json({ message: "Teacher Created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
