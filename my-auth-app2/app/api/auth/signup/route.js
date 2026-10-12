import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "../../../lib/auth.js";
import User from "../../../models/User.js";
import { sendEmail } from "@/app/lib/mail";

export async function POST(request) {
    try {
        const { name, email, password } = await request.json();

        if (!name || !email || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }


        if (password.length<8) {
            return NextResponse.json(
                { message: "password must be atleast 8 digit" },
                { status: 400 }
            );
        }


        // if (!email.includes("@") || !email.includes(".")) {
        //     return NextResponse.json(
        //         { message: "Please enter a valid email" },
        //         { status: 400 }
        //     );
        // }

        const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { message: "Please enter a valid email address" },
                { status: 400 }
            );
        }

        await connectDB();


        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const verificationCode = crypto.randomInt(100000, 1000000).toString();


        // console.log(verificationCode);
        await sendEmail(
            email,
            "Verify your email",
            `Your verification code is : ${verificationCode}`
        )



        const hashedVerificationCode = crypto
            .createHash("sha256")
            .update(verificationCode)
            .digest("hex");

        const verificationCodeExpires = new Date(Date.now() + 10 * 60 * 1000);


        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            verificationCode: hashedVerificationCode,
            verificationCodeExpires,
        });

        // verificationCode,
        return NextResponse.json(
            {
                message: "User registered successfully",

                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);

        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}