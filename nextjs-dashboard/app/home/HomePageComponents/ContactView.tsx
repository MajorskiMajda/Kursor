"use client";
import Image from "next/image";
import emailjs from "emailjs-com";

const ContactForm = () => {
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILER_SERVICE_ID || "", // Replace with your EmailJS service ID
        process.env.NEXT_PUBLIC_EMAILER_TEMPLATE_ID || "", // Replace with your EmailJS template ID
        e.target as HTMLFormElement, // Ensure the event target is cast correctly
        process.env.NEXT_PUBLIC_EMAILER_USER_ID || "" // Replace with your EmailJS user ID
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Poruka uspešno poslata!");
        },
        (error) => {
          console.error(error.text);
          alert("Greška u slanju poruke. Molimo Vas pokušajte kasnije.");
        }
      );
  };

  return (
    <div className="flex flex-col items-center justify-center h-fit">
      <div className="w-full flex flex-col px-8 lg:flex-row">
        {/* Contact Form Section */}
        <div className="w-full lg:pl-24 content-center px-8 lg:w-full">
          <h2 className="lg:text-5xl text-3xl font-bold text-neutral-300-900 text-center lg:text-left">
            Pošljite nam poruku
          </h2>
          <p className="mt-4 lg:text-xl text-lg text-neutral-300-600 text-center lg:text-left">
            Imate pitanja? Napišite nam na email ili pozovite na telefon.
          </p>

          <form onSubmit={sendEmail} className="mt-8">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-xl font-medium text-neutral-300-700"
              >
                Ime i prezime
              </label>
              <input
                autoComplete="off"
                type="text"
                id="name"
                name="name"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                required
                placeholder="Ime i prezime"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-xl font-medium text-neutral-300-700"
              >
                Email
              </label>
              <input
                autoComplete="off"
                type="email"
                id="email"
                name="email"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                required
                placeholder="example@example.com"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="subject"
                className="block text-xl font-medium text-neutral-300-700"
              >
                Predmet
              </label>
              <input
                autoComplete="off"
                type="text"
                id="subject"
                name="subject"
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                required
                placeholder="Predmet"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-xl font-medium text-neutral-300-700"
              >
                Vaša poruka
              </label>
              <textarea
                autoComplete="off"
                id="message"
                name="message"
                rows={5}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
                required
                placeholder="..."
              ></textarea>
            </div>

            <button type="submit" className="px-4 py-2 text-xl rounded-lg shadow-md download transition">
              Pošalji
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="w-full flex justify-center pr-4 lg:w-full lg:block hidden">
          <Image
            className="rounded-md"
            src="/mom.jpg"
            width={800}
            height={500}
            objectFit="contain"
            alt="Illustration for contact form"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
