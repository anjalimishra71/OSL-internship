import { NextResponse } from "next/server";

import { connectDB, getUserFromToken } from "@/app/lib/auth";
import Session from "@/app/models/Session";

export async function POST(request) {
  try {
    await connectDB();

    const user = getUserFromToken(request);

    if (!user) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    await Session.updateMany(
      { userId: user.userId },
      { isRevoked: true }
    );

    const response = NextResponse.json(
      { message: "Logged out from all devices" },
      { status: 200 }
    );

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Logout all error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}