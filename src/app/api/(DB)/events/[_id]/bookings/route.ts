import { NextRequest, NextResponse } from "next/server";
import { GETHelper } from "../getEventHelper";

export async function GET(request: NextRequest, { params }: { params: { _id: string } }) {
  const res = GETHelper(params._id, "bookingIds");
  console.log(res,'-----------en get')
  return res
}
