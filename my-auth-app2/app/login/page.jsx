"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";
import { apiRequest } from "../lib/api";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      
       await apiRequest("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      router.push("/dashboard");
    } catch (error) {
      setMessage(error.message);//"Something went wrong"
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}

          />

          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}

          />
          <Button type="submit" loading={loading} loadingText="Logging in...">Login</Button>

        </form>

        {message && (
          <p className="mt-4 text-red-500">
            {message}
          </p>
        )}

        <div className="mt-4 text-center">
          <button
            disabled={loading}
            onClick={() => router.push("/forgot-password")}
            className="text-blue-600"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}