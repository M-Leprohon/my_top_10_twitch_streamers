import bcrypt from "bcrypt";
import { db } from "@/db";
import { NextResponse } from "next/server";

export async function POST(request: any) {
  const body = await request.json();
  const {email, password } = body.data;
  console.log(body.data);

  if(!email || !password) {
    return new NextResponse("Missing email or password", { status: 400 })
  }

  const exists = await db.user.findUnique({
    where: {
      email: email
    }
  });

  if(exists) {
    return new NextResponse("User already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await db.user.create({
    data: {
      email,
      hashedPassword,
    }
  });

  return NextResponse.json(user);
}