"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  exp: number; // Expiration timestamp
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isRateLimited, setIsRateLimited] = useState(false); // Rate limit state
  const [rateLimitTimeLeft, setRateLimitTimeLeft] = useState(0); // Time left in seconds
  const router = useRouter();


  // Effect to handle the rate limit countdown
  useEffect(() => {
    if (!isRateLimited) return;

    const interval = setInterval(() => {
      setRateLimitTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsRateLimited(false); // Reset rate limit after countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRateLimited]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Clear previous errors

    try {
      const response = await fetch(`http://localhost:5001/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), 
      });

      console.log('Login response:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries())
      });
  
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        const token = data.token;
        const isV = data.isConfirmed;

        console.log("Response Data:", data);

        // Decode the token
        const decoded: { exp: number; isAdmin: boolean } = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (isExpired) {
          setError("Prijava je istekla. Molimo Vas prijavite se ponovo.");
          return;
        }
        if (isV === false) {
          setError("Molimo Vas potvrdite email adresu.");
          return;
        }

        // Store the token
        sessionStorage.setItem(process.env.AUTH_TOKEN || "", token);

        // Redirect based on isAdmin status
        if (decoded.isAdmin) {
          router.push("/registeradmin");
        } else {
          router.push("/pages/dashboard");
        }
      } else {
        // Handle rate-limiting error (429 status code)
        if (response.status === 429) {
          setIsRateLimited(true);
          setRateLimitTimeLeft(15 * 60); // 15 minutes in seconds
          setError("Dostigli ste maksimalan broj pokušaja. Molimo Vas pokušajte ponovo nakon 15 minuta.");
        } else {
          setError(data.error || "Neuspešno prijavljivanje. Molimo Vas proverite informacije.");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center bg-pattern justify-center h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-neutral-300-800 mb-4">Prijavite se</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-neutral-300-600 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Unesite Vašu email adresu"
              required
              disabled={isRateLimited || isLoading} // Disable input when rate-limited or loading
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-neutral-300-600 mb-2">
              Lozinka
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Unesite Vašu lozinku"
              required
              disabled={isRateLimited || isLoading} // Disable input when rate-limited or loading
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {isRateLimited && (
            <p className="text-blue-600 text-sm mb-4">
              Preostalo vreme: {Math.floor(rateLimitTimeLeft / 60)} minutes {rateLimitTimeLeft % 60} seconds
            </p>
          )}

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md ${isRateLimited || isLoading ? "bg-gray-400 cursor-not-allowed" : "download"
              } text-white`}
            disabled={isRateLimited || isLoading} // Disable button when rate-limited or loading
          >
            {isLoading ? "Prijava u toku..." : "Prijavite se"}
          </button>
        </form>

        {/* Back to Homepage Link */}
        <div className="mt-4 text-center">
          <a href="/" className="text-blue-600 hover:underline">
            Nazad na početnu
          </a>
        </div>
      </div>
    </div>
  );
}