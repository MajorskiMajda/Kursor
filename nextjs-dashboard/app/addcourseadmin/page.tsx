"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  isAdmin: boolean;
}

export default function AddCoursePage() {
  const [email, setEmail] = useState("");
  const [courseName, setCourseName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // New state to track admin status
  const router = useRouter();

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Check if the user is authenticated and has admin privileges
  useEffect(() => {
    const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");

    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decoded: TokenPayload = jwtDecode(token);

      if (!decoded.isAdmin) {
        sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
        sessionStorage.clear();
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

  // Logout handler
  const handleLogout = () => {
    sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
    router.replace("/login");
  };

  // Add course handler
  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Pogrešan format email adrese.");
      return;
    }

    const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/add-course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email, // Email of the user
          courseName: courseName, // The new course name
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle success (e.g., redirect to another page or show a success message)
        setError("Kurs uspešno dodat korisniku!");
        setEmail("");
        setCourseName("");
      } else {
        setError(data.error || "Greška u pri dodavanju kurseva");
      }
    } catch (err) {
      setError("Došlo je do grešle. Pokušajte ponovo.");
    }
  };

  if (loading) return <p>Učitavanje...</p>;

  if (!isAdmin) return null; // Do not render the layout if the user is not an admin

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-neutral-300-800">Add Course to User</h2>
          <p className="text-sm text-neutral-300-600">Fill out the form below to add a course to a user.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleAddCourse} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-300-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter user's email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Course Name */}
            <div>
              <label htmlFor="courseName" className="block text-sm font-medium text-neutral-300-700 mb-1">
                Course Name
              </label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                placeholder="Enter course name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Submit Button */}
          <div className="mt-6">
            <button

              type="submit"
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add Course
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/registeradmin")}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 underline"
            >
              Go Back
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-white bg-red-500 rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}