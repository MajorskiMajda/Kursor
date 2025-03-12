"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ConfirmEmail() {
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleConfirmEmail = async () => {
      const path = window.location.pathname; // "/auth/confirm-email/token=..."
      const token = path.split('/token=')[1]; // Extract the token part

      if (!token) {
        setError("Nevažeći token");
        return;
      }

      try {
        // Pass the token as a query parameter in the fetch URL
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/confirm-email?token=${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log(data);

        if (!response.ok) {
          setError(data.error || "Neuspešna potvrda email adrese.");
          return;
        }

        setMessage("Email adresa uspešno potvrđena!");
        setTimeout(() => router.replace("/login"), 5000);
      } catch (err) {
        setError("Došlo je do greške. Molimo Vas pokušajte ponovo.");
        console.error(err);
      }
    };

    handleConfirmEmail(); // Call the function when the component mounts
  }, [router]); // Adding router as a dependency to re-trigger in case of navigation

  return (
    <div className="flex items-center bg-pattern justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-neutral-300-800 mb-4">Email Confirmation</h2>
        <div className="mb-4">
          {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        </div>

        {isLoading ? (
          <p className="text-blue-500">Potvrda u toku...</p>
        ) : (
          <p className="text-neutral-300-500">Potvrda email adrese u toku...</p>
        )}
      </div>
    </div>
  );
}
