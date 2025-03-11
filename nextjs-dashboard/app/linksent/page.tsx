"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MailCheck } from "lucide-react"; // Import icons from lucide-react

export default function EmailSent() {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const sendEmail = async () => {
      try {
        setTimeout(() => {
          setMessage("Link za potvrdu je uspešno poslat na email adresu!");
          setIsLoading(false);
        }, 3000); // Reduced delay for better UX
      } catch (error) {
        setMessage("Došlo je do greške. Pokušajte ponovo.");
        setIsLoading(false);
      }
    };

    sendEmail();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-xl text-center">
        <div className="flex justify-center items-center mb-4">
          {isLoading ? (
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
          ) : (
            <MailCheck className="w-12 h-12 text-green-500" />
          )}
        </div>

        <h2 className="text-xl font-semibold text-neutral-300-800 mb-2">Potvrda Email Adrese</h2>

        <p className={`text-sm ${isLoading ? "text-neutral-300-600" : "text-green-600"} mb-6`}>
          {isLoading ? "Link za potvrdu se šalje..." : message}
        </p>

        <button
          onClick={() => router.push("/registeradmin")}
          className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition duration-200"
        >
          Vrati se nazad na registraciju
        </button>
      </div>
    </div>
  );
}
