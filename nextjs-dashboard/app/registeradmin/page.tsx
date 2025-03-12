"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  isAdmin: boolean;
}

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded: TokenPayload = jwtDecode(token);
      console.log(decoded); // Debugging token

      if (!decoded.isAdmin) {
        sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
        router.replace("/login");
        return;
      }

      setIsAdmin(true); // Set isAdmin to true if the user is an admin
    } catch (error) {
      sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
    router.replace("/login");
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    if (password.length < 8) {
      return false;
    }
    if (!/\d/.test(password)) {
      return false;
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return false;
    }
    return true;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Pogrešan format email adrese.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Lozinka mora sadržati barem osam slova, jedan broj i jedan poseban karakter"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Lozinke se ne poklapaju.");
      return;
    }

    try {
      const today = new Date();
      const creationDate = today.toISOString().split("T")[0];

      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 2);

      const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");

      const response = await fetch(`${process.env.BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          courseName,
          creationDate: creationDate,
          expirationDate: expirationDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/linksent");
      } else {
        setError(data.error || "Neuspešna registracija. Pokušajte ponovo.");
      }
    } catch (err) {
      setError("Došlo je do greške. Molimo Vas pokušajte ponovo.");
    }
  };

  if (loading) return <p>Učitavanje...</p>;

  if (!isAdmin) return null; // Do not render the page if the user is not an admin

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-neutral-300-800">Registracija Korisnika</h2>
          <p className="text-sm text-neutral-300-600">Popunite formular ispod da registrujete novog korisnika.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { label: "First Name", id: "firstName", value: firstName, setter: setFirstName },
              { label: "Last Name", id: "lastName", value: lastName, setter: setLastName },
              { label: "Email", id: "email", value: email, setter: setEmail, type: "email" },
              { label: "Course Name", id: "courseName", value: courseName, setter: setCourseName },
              { label: "Password", id: "password", value: password, setter: setPassword, type: "password" },
              { label: "Confirm Password", id: "confirmPassword", value: confirmPassword, setter: setConfirmPassword, type: "password" },
            ].map(({ label, id, value, setter, type = "text" }) => (
              <div key={id} className="mb-4">
                <label htmlFor={id} className="block text-sm font-medium text-neutral-300-700 mb-1">{label}</label>
                <input
                  type={type}
                  id={id}
                  value={value}
                  onChange={(e) => setter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Unesite ${label.toLowerCase()}`}
                  required
                />
              </div>
            ))}
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Registruj korisnika
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-2 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/addcourseadmin")}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 underline"
            >
              Dodaj kurs korisniku
            </button>
            <button
              onClick={() => router.push("/createcourseadmin")}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 underline"
            >
              Kreiraj novi kurs
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Odjavite se
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}