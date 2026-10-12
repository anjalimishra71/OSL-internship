import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import crypto from "crypto";

import { connectDB } from "@/app/lib/auth";
import Session from "@/app/models/Session";

export async function POST(request) {
  try {
    await connectDB();

    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Refresh token is required" },
        { status: 401 }
      );
    }

    // Verify JWT
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_SECRET
    );

    // Hash token and find session
    const hashedRefreshToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const session = await Session.findOne({
      userId: decoded.userId,
      refreshToken: hashedRefreshToken,
      isRevoked: false,
    });

    if (!session) {
      return NextResponse.json(
        { message: "Invalid session" },
        { status: 401 }
      );
    }

    // Check session expiry
    if (session.expiresAt < new Date()) {
      session.isRevoked = true;
      await session.save();

      return NextResponse.json(
        { message: "Session has expired" },
        { status: 401 }
      );
    }

    // Generate new access token
    const accessToken = jwt.sign(
      {
        userId: decoded.userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    const response = NextResponse.json(
      { message: "Access token refreshed" },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Refresh token error:", error);

    return NextResponse.json(
      { message: "Invalid or expired refresh token" },
      { status: 401 }
    );
  }
}