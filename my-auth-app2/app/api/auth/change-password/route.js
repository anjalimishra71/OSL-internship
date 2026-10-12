import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB, getUserFromToken } from "@/app/lib/auth";
import User from "@/app/models/User";
import Session from "@/app/models/Session";

export async function POST(request) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();

    // Check if user is logged in
    const tokenUser = getUserFromToken(request);

    if (!tokenUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findById(tokenUser.userId);

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Check current password
    const isPasswordCorrect = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // New password should be different
    if (currentPassword === newPassword) {
      return NextResponse.json(
        { message: "New password must be different" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    // Logout all existing sessions
    await Session.updateMany(
      { userId: user._id },
      { isRevoked: true }
    );

    // Remove current cookies too
    const response = NextResponse.json(
      { message: "Password changed successfully" },
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
    console.error("Change password error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}