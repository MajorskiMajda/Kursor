"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path = window.location.pathname; // "/auth/confirm-email/token=..."
  const token = path.split('/token=')[1]; // Extract the token part
  console.log(token);

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "sessionCleared") {
        sessionStorage.clear();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Password must contain at least one number
    if (!/\d/.test(password)) {
      return false;
    }

    // Password must contain at least one special character
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }

    return true;
  };

  const handleResetPassword = async () => {
    if (loading) return;
    setLoading(true);

    if (!token) {
      setError("Nevažeći token.");
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError("Pogrešan format email adrese.");
      setLoading(false);
      return;
    }

    if (!validatePassword(newPassword)) {
      setError(
        "Lozinka mora sadržati barem osam slova, jedan broj i jedan poseban karakter"
      );
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Lozinke se ne poklapaju.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Neuspešna promena lozinke");
        setLoading(false);
        return;
      }

      // Clear session in current tab
      sessionStorage.clear();

      // Broadcast logout event across all tabs
      localStorage.setItem("sessionCleared", "true");
      window.dispatchEvent(new Event("storage"));

      setMessage("Lozinka uspešno promenjena! Preusmeravanje na prijavu...");
      setTimeout(() => router.replace("/login"), 2000);
    } catch (err) {
      setError("Došlo je do greške. Molimo Vas pokušajte ponovo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-neutral-300-800 mb-4">Promena lozinke</h1>
        {message && <p className="text-green-500 mb-4">{message}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 mb-4"
        />
        <button
          onClick={handleResetPassword}
          disabled={loading}
          className={`w-full py-2 px-4 text-white rounded-md ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
            }`}
        >
          {loading ? "Promena lozinke u toku..." : "Lozinka promenjena"}
        </button>
      </div>
    </div>
  );
}