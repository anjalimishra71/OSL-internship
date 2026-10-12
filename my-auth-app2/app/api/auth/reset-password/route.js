import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";

import { connectDB } from "@/app/lib/auth";
import User from "@/app/models/User";
import Session from "@/app/models/Session";

export async function POST(request) {
  try {
    const { email, resetCode, newPassword } = await request.json();

    if (!email || !resetCode || !newPassword) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword.length<8) {
      return NextResponse.json(
        { message: "password must be atleast 8 digit"},
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid reset request" },
        { status: 400 }
      );
    }

    // Hash the code entered by the user
    const hashedResetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    // Check code
    if (hashedResetCode !== user.resetPasswordCode) {
      return NextResponse.json(
        { message: "Invalid reset code" },
        { status: 400 }
      );
    }

    // Check expiry
    if (
      !user.resetPasswordCodeExpires ||
      user.resetPasswordCodeExpires < new Date()
    ) {
      return NextResponse.json(
        { message: "Reset code has expired" },
        { status: 400 }
      );
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    // Make reset code one-time
    user.resetPasswordCode = null;
    user.resetPasswordCodeExpires = null;

    await user.save();

    // Logout user from all devices
    await Session.updateMany(
      { userId: user._id },
      { isRevoked: true }
    );

    return NextResponse.json(
      { message: "Password reset successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Reset password error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}