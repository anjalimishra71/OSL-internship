"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiRequest } from "@/app/lib/api";

export default function useAuth() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getUser() {
            try {
                const data =await apiRequest("/api/auth/me")
                setUser(data.user);

            } catch (error) {
                router.push("/login");
            } finally {
                setLoading(false);
            }
        }
        getUser();
    }, [router])

    return { user, loading }
}