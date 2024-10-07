import { NextResponse } from "next/server";

// db
import db from "@/config/db";
// models
// note
import Note from "@/models/notes";

export async function GET(){
    await db()
    const notes = await Note.find().sort({createdAt: -1})
    return NextResponse.json({notes},{status: 200})
}

export async function POST(request){
    const {text} = await request.json()
    await db()
    const newNote = await Note.create({text})
    return NextResponse.json({newNote}, {status: 201})
}

export async function DELETE(request){
    const _id = request.nextUrl.searchParams.get('_id')
    await db()
    await Note.findByIdAndDelete(_id)
    return NextResponse.json({message: 'note deleted successfully', _id}, {status: 200})
}