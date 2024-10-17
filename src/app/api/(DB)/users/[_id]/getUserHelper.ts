import dbConnect from "@/app/lib/mongoDB/dbConnect";
import { Types } from "mongoose";
import { UserModel } from "@/app/lib/mongoDB/models/userModel";
import { NextResponse } from "next/server";

export async function GETHelper(userId: string, field: string) {
  await dbConnect(); // Ensure database connection is established

  const user = await UserModel.findById(userId).select(field).populate(field);
  //if not found return 404
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  if (user[field].length < 1)
    return NextResponse.json({ error: `User.${field} not foundor empty` }, { status: 404 });

  return NextResponse.json(user[field], { status: 200 });
}
