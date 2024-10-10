import { NextResponse } from "next/server"

export const GET = () => {
    return NextResponse.json({message: 'HOME Page'},{status: 200})
}