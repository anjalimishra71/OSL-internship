import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/app/lib/auth";
import User from "@/app/models/User";
import { sendEmail } from "@/app/lib/mail";
export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const user = await User.findOne({ email });


    if (!user) {
      return NextResponse.json({
        message:
          "If an account exists, a password reset code has been sent",
      });
    }

    // Generate 6-digit code
    const resetCode = crypto
      .randomInt(100000, 1000000)
      .toString();
    // console.log(resetCode)
   
    await sendEmail(
      email,
      "reset your password",
      `your password reset code is : ${resetCode}`
    )

    // Hash code before saving
    const hashedResetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

   
    user.resetPasswordCode = hashedResetCode;
    user.resetPasswordCodeExpires = new Date(
      Date.now() + 10 * 60 * 1000
    );

    await user.save();

    //  resetCode,
    return NextResponse.json({
      message:
        "If an account exists, a password reset code has been sent",

    });
  } catch (error) {
    console.error("Forgot password error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}