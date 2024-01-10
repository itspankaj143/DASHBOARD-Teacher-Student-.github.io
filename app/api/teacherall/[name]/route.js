import Teacher from "@/models/Teacher_Schema";
import { NextResponse } from "next/server";

// Get teacher using id
export async function GET(request) {
  const username = request.url.split("/teacherall/")[1];
  // const username = request.params.name;
  // console.log(id);
  try {
    const teacher = await Teacher.findOne({
      where: { UserName: username },
      // where: { id:request.params.id },
      // where:{
      //   id:{
      //     equals:parseInt(id)
      //   }
      // }
    });
    // console.log(teacher);
    if (teacher) {
      return NextResponse.json({ teacher }, { status: 200 });
    } else {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update teacher by id
export async function PUT(request) {
  try {
    const id = request.url.split("/teacherall/")[1];
    const { FirstName, LastName, UserName, Password, Role } =
      await request.json();
    const updatedTeacher = await Teacher.update(
      {
        FirstName,
        LastName,
        UserName,
        Password,
        Role,
      },
      { where: { id: id } }
    );

    if (!updatedTeacher) {
      throw new Error("Could not update teacher");
    }

    return NextResponse.json(
      { message: "Teacher Updated Successfully", updatedTeacher },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
// Delete teacher using id
export async function DELETE(request) {
  const id = request.url.split("/teacherall/")[1];
  try {
    const delteacher = await Teacher.destroy({ where: { id: id } });
    if (delteacher) {
      return NextResponse.json(
        { message: "Teacher Deleted Successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Teacher not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
