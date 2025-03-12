"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[0-9]).{8,}$/;
        return passwordRegex.test(password);
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Pogrešan format email adrese.");
            return;
        }

        if (!validatePassword(password)) {
            setError("Lozinka mora sadržati barem osam slova, jedan broj i jedan poseban karakter.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Lozinke se ne poklapaju.");
            return;
        }

        try {
            const today = new Date();
            const creationDate = today.toISOString().split('T')[0];

            const expirationDate = new Date();
            expirationDate.setMonth(expirationDate.getMonth() + 2);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    firstName,
                    lastName,
                    creationDate,
                    expirationDate,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                router.push("/linksent");
            } else {
                setError(data.error || "Neuspešna registracija. Molimo Vas pokušajte ponovo.");
            }
        } catch (err) {
            setError("Došlo je do greške. Pokušajte ponovo.");
        }
    };

    return (
        <div className="flex items-center bg-pattern justify-center h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-neutral-300-800 mb-4">Register</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="firstName" className="block text-sm text-neutral-300-600 mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="lastName" className="block text-sm text-neutral-300-600 mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

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
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm text-neutral-300-600 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-sm text-neutral-300-600 mb-2">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-600 text-white rounded-md"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
