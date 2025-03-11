"use client";
import React, { useState } from "react";
import emailjs from "emailjs-com";
import { Loader2, MailCheck } from "lucide-react";

export default function HelpPage() {
  const [formData, setFormData] = useState({
    name: "",
    lastN: "",  // Added last name field
    email: "",
    subject: "", // Added subject field
    message: "",
  });

  const [formStatus, setFormStatus] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.lastN || !formData.email || !formData.subject || !formData.message) {
      setFormStatus("Molimo Vas popunite sva polja.");
      return;
    }

    setIsLoading(true);

    const templateParams = {
      name: formData.name,
      lastN: formData.lastN, // Pass the last name here
      email: formData.email,
      subject: formData.subject, // Pass the subject here
      message: formData.message,
    };

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILER_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILER_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILER_USER_ID || ""
      )
      .then(
        () => {
          setFormStatus("Vaša poruka je uspešno poslata!");
          setFormData({ name: "", lastN: "", email: "", subject: "", message: "" });
          setTimeout(() => setFormStatus(null), 5000);
        },
        (error) => {
          console.log("Service ID:", process.env.NEXT_PUBLIC_EMAILER_SERVICE_ID);
          console.log("Template ID:", process.env.NEXT_PUBLIC_EMAILER_TEMPLATE_ID);
          console.log("User ID:", process.env.NEXT_PUBLIC_EMAILER_USER_ID);
          console.log('Error:', error);
          setFormStatus(`Došlo je do greške. Error: ${error.text}`);
          setTimeout(() => setFormStatus(null), 3000);
        }
      )
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center">Podrška</h1>

      <div className="mb-6 text-center">
        <p className="text-lg">
          📞 <span className="font-medium">Kontakt Telefon:</span>{" "}
          <a href="tel:+123456789" className="text-blue-500 hover:underline">
            +1 234 567 89
          </a>
        </p>
        <p className="text-lg">
          📧 <span className="font-medium">Email:</span>{" "}
          <a
            href="mailto:support@example.com"
            className="text-blue-500 hover:underline"
          >
            support@example.com
          </a>
        </p>
      </div>

      <h2 className="text-2xl font-semibold mb-4 text-center">
        Pošaljite nam poruku
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1 font-medium">
            Ime
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Unesite Vaše ime"
            required
          />
        </div>

        <div>
          <label htmlFor="lastN" className="block mb-1 font-medium">
            Prezime
          </label>
          <input
            type="text"
            id="lastN"
            name="lastN"
            value={formData.lastN}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Unesite Vaše prezime"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Unesite Vašu email adresu"
            required
          />
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1 font-medium">
            Predmet
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Unesite predmet poruke"
            required
          />
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 font-medium">
            Poruka
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="Unesite Vašu Poruku"
            rows={4}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Loader2 className="animate-spin mr-2" size={20} />
              Poruka se šalje...
            </div>
          ) : (
            "Pošalji"
          )}
        </button>
      </form>

      {formStatus && (
        <div
          className={`mt-6 p-4 rounded-lg text-center font-medium ${formStatus.includes("uspešno")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
        >
          <p>{formStatus}</p>
          {formStatus.includes("uspešno") ? (
            <MailCheck className="mx-auto mt-2 text-green-700" size={32} />
          ) : null}
        </div>
      )}
    </div>
  );
}
