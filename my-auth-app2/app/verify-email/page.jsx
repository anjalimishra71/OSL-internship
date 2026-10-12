"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";
import { apiRequest } from "../lib/api";

export default function VerifyEmailPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      
    const data= await apiRequest("/api/auth/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verificationCode,
        }),
      });

    
      setMessage(data.message);

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-2">
          Verify Email
        </h1>

        <p className="text-gray-600 mb-6">
          Enter the verification code sent to your email.
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
            placeholder="Verification Code"
            value={verificationCode}
            onChange={(e) =>
              setVerificationCode(e.target.value)
            }

          />

          
          <Button type="submit" loading={loading} loadingText="Verifying...">Verify Email</Button>

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