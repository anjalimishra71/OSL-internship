import { NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/app/lib/auth";
import User from "@/app/models/User";

export async function POST(request) {
    try {
        const { email, verificationCode } = await request.json();

        if (!email || !verificationCode) {
            return NextResponse.json(
                { message: "Email and verification code are required" },
                { status: 400 }
            );
        }

        await connectDB();

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid verification request" },
                { status: 400 }
            );
        }

        if (user.isVerified) {
            return NextResponse.json(
                { message: "Email is already verified" },
                { status: 400 }
            );
        }

        // Hash the code entered by the user
        const hashedCode = crypto
            .createHash("sha256")
            .update(verificationCode)
            .digest("hex");

        // Check code
        if (hashedCode !== user.verificationCode) {
            return NextResponse.json(
                { message: "Invalid verification code" },
                { status: 400 }
            );
        }

        // Check expiry
        if (
            !user.verificationCodeExpires ||
            user.verificationCodeExpires < new Date()
        ) {
            return NextResponse.json(
                { message: "Verification code has expired" },
                { status: 400 }
            );
        }

        // Verify user
        user.isVerified = true;
        user.verificationCode = null;
        user.verificationCodeExpires = null;

        await user.save();

        return NextResponse.json(
            { message: "Email verified successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Email verification error:", error);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}