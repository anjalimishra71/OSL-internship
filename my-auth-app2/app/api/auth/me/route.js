import { NextResponse } from "next/server";
import { connectDB, getUserFromToken } from "@/app/lib/auth";
import User from "@/app/models/User";

export async function GET(request) {
  try {
    await connectDB();
    const tokenUser = getUserFromToken(request);

    if (!tokenUser) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const user = await User.findById(tokenUser.userId).select(
      "name email"
    );

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Me API error:", error);

    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}