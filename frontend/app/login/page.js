"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");

    const handleLogin = async () => {
        try {
            const res = await fetch(`${process.env.BACKEND_ORIGIN}/api/login`, {
                method: "POST",
                credentials: "include", // ✅ IMPORTANT: to send/receive cookies
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: 1, username }),
            });

            const data = await res.json();
            if (res.ok) {
                console.log("Login success:", data);
                router.push("/dashboard");
            } else {
                console.error("Login failed", data);
            }
        } catch (err) {
            console.error("Error logging in:", err);
        }
    };

    return (
        <div className="p-6 flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Login</h1>
            <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="p-2 border rounded"
            />
            <button
                onClick={handleLogin}
                className="bg-blue-600 text-white px-4 py-2 rounded"
            >
                Login
            </button>
        </div>
    );
}
