import { NextRequest } from "next/server";
import { GETHelper } from "../getUserHelper";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  return await GETHelper(params.id, "events");
}
