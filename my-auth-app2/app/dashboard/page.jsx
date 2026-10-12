"use client";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { apiRequest } from "../lib/api";
export default function DashboardPage() {
    const router = useRouter();
     const {user,loading}=useAuth();

    async function handleLogout() {
        await apiRequest("/api/auth/logout", {
            method: "POST",
        });
        router.push("/login");
    }

    if (loading) {
        return <p className="p-6">Loading...</p>;
    }

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-3xl font-bold">
                Welcome, {user?.name}
            </h1>

            <p className="mt-2">
                Email: {user?.email}
            </p>
            <button
                disabled={loading}
                onClick={() => router.push("/change-password")}
                className="mt-6 mr-3 border px-5 py-3 rounded"
            >
                Change Password
            </button>
            <button
                disabled={loading}
                onClick={handleLogout}
                className="mt-6 bg-black text-white px-5 py-3 rounded"
            >
                Logout
            </button>
        </div>
    );
}
