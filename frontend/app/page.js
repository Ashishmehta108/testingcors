
"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HomePage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome Home</h1>
      <button
        onClick={goToLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Go to Login
      </button>
    </div>
  );
}
