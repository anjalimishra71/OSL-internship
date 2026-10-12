import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/app/lib/auth";
import Session from "@/app/models/Session";

export async function POST(request) {
  try {
    await connectDB();

    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (refreshToken) {
      const hashedRefreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

      await Session.findOneAndUpdate(
        {
          refreshToken: hashedRefreshToken,
          isRevoked: false,
        },
        {
          isRevoked: true,
        }
      );
    }

    const response = NextResponse.json(
      { message: "Logout successful" },
      { status: 200 }
    );

    // Remove cookies
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
    console.error("Logout error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
