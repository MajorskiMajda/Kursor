"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  isAdmin: boolean;
}

export default function CreateCourseAdmin() {
  const [course, setCourse] = useState({
    level: "",
    videoLink: "",
    videoImageLink: "",
    videoTitle: "",
    pdfLink: "",
  });
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loading state for form submission
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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!course.level || !course.videoLink || !course.videoImageLink || !course.videoTitle || !course.pdfLink) {
      setError("Sva polja su obavezna.");
      return;
    }

    setIsSubmitting(true); // Disable the submit button
    setError(null); // Clear previous errors

    const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api/courses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(course),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to add course");
      }

      // Handle success
      alert("Course added successfully!");
      setCourse({ level: "", videoLink: "", videoImageLink: "", videoTitle: "", pdfLink: "" });
    } catch (err) {
      setError("Failed to add course");
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
    router.replace("/login");
  };

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return null; // Do not render the page if the user is not an admin

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-neutral-300-800">Add New Course</h2>
          <p className="text-sm text-neutral-300-600">Fill out the form below to create a new course.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Level */}
            <div>
              <label htmlFor="level" className="block text-sm font-medium text-neutral-300-700 mb-1">
                Level
              </label>
              <input
                type="text"
                name="level"
                value={course.level}
                onChange={handleChange}
                placeholder="Level (e.g., A1)"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Video Link */}
            <div>
              <label htmlFor="videoLink" className="block text-sm font-medium text-neutral-300-700 mb-1">
                Video Link
              </label>
              <input
                type="text"
                name="videoLink"
                value={course.videoLink}
                onChange={handleChange}
                placeholder="Video Link"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Video Image Link */}
            <div>
              <label htmlFor="videoImageLink" className="block text-sm font-medium text-neutral-300-700 mb-1">
                Video Image Link
              </label>
              <input
                type="text"
                name="videoImageLink"
                value={course.videoImageLink}
                onChange={handleChange}
                placeholder="Video Image Link"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Video Title */}
            <div>
              <label htmlFor="videoTitle" className="block text-sm font-medium text-neutral-300-700 mb-1">
                Video Title
              </label>
              <input
                type="text"
                name="videoTitle"
                value={course.videoTitle}
                onChange={handleChange}
                placeholder="Video Title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* PDF Link */}
            <div>
              <label htmlFor="pdfLink" className="block text-sm font-medium text-neutral-300-700 mb-1">
                PDF Link
              </label>
              <input
                type="text"
                name="pdfLink"
                value={course.pdfLink}
                onChange={handleChange}
                placeholder="PDF Link"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting} // Disable button while submitting
              className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {isSubmitting ? "Adding..." : "Add Course"}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="px-2 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={() => router.push("/registeradmin")}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 underline"
            >
              Nazad
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