"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      // Temporary testing
      // localStorage.setItem("resetEmail", email);

      // if (data.resetCode) {
      //   localStorage.setItem("resetCode", data.resetCode);
      // }

      router.push("/reset-password");
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
          Forgot Password
        </h1>

        <p className="text-gray-600 mb-6">
          Enter your email to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white p-3 rounded"
          >
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-red-500">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}