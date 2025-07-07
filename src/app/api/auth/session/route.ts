import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";




export async function GET() {
  try {
    const session = await auth();
    return NextResponse.json(session || { user: null });
  } catch (error) {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}