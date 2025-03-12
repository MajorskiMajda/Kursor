"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  ); // Default profile picture
  const [creationDate, setCreationDate] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [confirmationMessage, setConfirmationMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data (you can replace this with your actual API)
    const fetchUserData = async () => {
      try {
        const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");

        if (!token) {
          setError("Token je istekao. Molimo Vas prijavite se ponovo.");
          router.replace("/login"); // Redirect if no token
          return;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setError("Geška pri učitavanju podataka korisnika.");
          return;
        }

        const data = await response.json();

        // Set user data to state
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setProfilePicture(data.profilePicture || profilePicture);
        setCreationDate(data.creationDate);
        setExpireDate(data.expireDate);
      } catch (err) {
        setError("Došlo je do greške. Molimo Vas pokušajte ponovo.");
      }
    };

    fetchUserData();
  }, [router]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      return;
    }

    // Send the token to the backend for confirmation
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/confirm-password-change?token=${token}`)
      .then(response => response.json())
      .then(data => {
        setConfirmationMessage(data.message); // Update state with confirmation message
        console.log(data.message);
      })
      .catch(error => {
        setError('Greška u potvrdi promene lozinke.');
      });
  }, []);

  const handlePasswordResetLink = async () => {
    try {
      const emailL = email;
      // Request to send a reset link to the email
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/request-password-change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailL }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.error || 'Greška u slanju email-a za potvrdu promene lozinke.');
        return;
      }

      alert('Link za reset lozinke uspešno poslat na email adresu!');
    } catch (err) {
      alert("Došlo je do greške. Molimo Vas pokušajte ponovo.");
      console.log(err);
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 min-h-screen bg-white shadow-lg">
      <div className="text-center">
        {/* Profile Picture */}
        <img
          src={profilePicture}
          alt="Profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
      </div>

      {/* Profile Details */}
      <div className="mb-8">
        <div className="mb-4">
          <label className="block font-medium mb-1">Ime</label>
          <input
            type="text"
            value={firstName}
            disabled
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-neutral-50 shadow-sm  text-neutral-300-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Prezime</label>
          <input
            type="text"
            value={lastName}
            disabled
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-neutral-50 shadow-sm  text-neutral-300-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 bg-neutral-50 shadow-sm text-neutral-300-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Datum Kreiranja Naloga</label>
          <input
            type="text"
            value={creationDate ? new Date(creationDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}

            disabled
            className="w-full p-2 border border-gray-300 bg-neutral-50 shadow-sm  text-neutral-300-600 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Datum Isteka Naloga</label>
          <input
            type="text"
            value={expireDate ? new Date(expireDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : ""}

            disabled
            className="w-full p-2 border border-gray-300 bg-neutral-50 shadow-sm text-neutral-300-600 rounded"
          />
        </div>
      </div>

      {/* Show Confirmation Message */}
      {confirmationMessage && (
        <div className="mt-4 text-center text-green-600">
          {confirmationMessage}
        </div>
      )}

      {/* Show Error */}
      {error && (
        <div className="mt-4 text-center text-red-600">
          {error}
        </div>
      )}

      {/* Password Reset Link */}
      <div className="text-center mt-8">
        <button
          onClick={handlePasswordResetLink}
          className="px-4 py-2 logout rounded shadow"
        >
          Zatrazite Promenu Sifre
        </button>
      </div>
    </div>
  );
}
