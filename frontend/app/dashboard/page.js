"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [authenticated, setAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await fetch(`${process.env.BACKEND_ORIGIN}/api/check-auth`, {
                    credentials: "include", // ✅ send cookies
                });
                console.log(await res.json())
                if (res.ok) {
                    setAuthenticated(true);
                } else {
                    router.push("/login");
                }
            } catch {
                router.push("/login");
            }
        };

        checkAuth();
    }, [router]);

    if (authenticated === null) {
        return <div>Checking authentication...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold">Welcome to Dashboard</h1>
            <p>You are authenticated ✅</p>
        </div>
    );
}
