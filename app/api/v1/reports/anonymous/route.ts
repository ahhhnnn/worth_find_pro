import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      accepted: false,
      message: "Reserved in V1.0. Anonymous report pipeline will be enabled in V1.1."
    },
    { status: 501 }
  );
}
