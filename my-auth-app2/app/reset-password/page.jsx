"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";
import { apiRequest } from "../lib/api";

export default function ResetPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [resetCode, setResetCode] = useState("");

  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }
    setLoading(true);
    try {

      const data = await apiRequest("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          resetCode,
          newPassword,
        }),
      });

      setMessage(data.message);

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          Reset Password
        </h1>

        <p className="text-gray-600 mb-6">
          Enter the reset code and your new password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />

          <Input
            type="text"
            placeholder="Reset Code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}

          />

          <Input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}

          />

          <Button type="submit" loading={loading} loadingText="Resetting...">Reset Password</Button>

        </form>

        {message && (
          <p className="mt-4 text-center">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}