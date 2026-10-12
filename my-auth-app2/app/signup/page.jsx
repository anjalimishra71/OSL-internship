"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../components/Input";
import Button from "../components/Button";
import { apiRequest } from "../lib/api";

export default function SignupPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
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

    if (!formData.name || !formData.email || !formData.password) {
      setMessage("All fields are required");
      return;
    }

    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      
       await apiRequest("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      
      router.push("/verify-email");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-lg">
        <h1 className="text-2xl font-bold mb-6">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

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

         
          <Button type="submit" loading={loading} loadingText="Creating...">Sign Up</Button>
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