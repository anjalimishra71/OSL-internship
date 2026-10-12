"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            try {
                const response = await fetch("/api/auth/me");

                const data = await response.json();

                if (!response.ok) {
                    router.push("/login");
                    return;
                }

                setUser(data.user);
            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [router]);

    async function handleLogout() {
        await fetch("/api/auth/logout", {
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
                onClick={() => router.push("/change-password")}
                className="mt-6 mr-3 border px-5 py-3 rounded"
            >
                Change Password
            </button>
            <button
                onClick={handleLogout}
                className="mt-6 bg-black text-white px-5 py-3 rounded"
            >
                Logout
            </button>
        </div>
    );
}
