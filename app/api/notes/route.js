import { NextResponse } from "next/server";


// config
// db
import dbConnection from "@/config/db";
// models
// notes
import Note from "@/models/noteModel";





// get all notes
export async function GET() {
    try{
        await dbConnection()
        const notes = await Note.find().sort({createdAt: -1})
        return NextResponse.json({notes},{status: 200})
    }catch(err){
        return NextResponse.json(
          { error: "get all notes error" },
          {
            status: 400,
          }
        );
    }
}

// add new note
export async function POST(request) {
    const {text} = await request.json()
    try {
      await dbConnection();
      const newNote = await Note.create({text});
      return NextResponse.json({ note:newNote }, { status: 200 });
    } catch (err) {
      return NextResponse.json(
        { error: "add new note error" },
        { status: 400 }
      );
    }
}

// delete note
export async function DELETE(request) {
    console.log(request)
    const _id = request.nextUrl.searchParams.get("_id")
    try{
        await dbConnection()
        await Note.findByIdAndDelete(_id)
        return NextResponse.json({message: 'note deleted successfully',_id},{status: 200})
    }catch(err){
        return NextResponse.json({error: 'delete note error'}, {status: 400})
    }
}

