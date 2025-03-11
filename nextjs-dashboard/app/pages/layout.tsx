"use client";
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [authChecked, setAuthChecked] = useState(false); // State to track if auth check is complete
  const router = useRouter();

  useEffect(() => {
    const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");

    if (!token) {
      // If no token, redirect to login
      router.replace('/login');
    } else {
      // If token exists, set authChecked to true
      setAuthChecked(true);
    }
  }, [router]);

  // If auth check is not complete, return null (render nothing)
  if (!authChecked) {
    return null;
  }

  // If auth check is complete and user is authenticated, render the layout
  return (
    <html lang="sr">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta name="description" content="Prijavite se na Kursor i započnite svoje online učenje engleskog jezika. Pristupite besplatnim testovima, lekcijama i materijalima prilagođenim korisnicima sa Balkana." />

        <meta name="keywords" content="prijava, učenje engleskog, online kurs, online nastava, engleski jezik, testovi, lekcije, Kursor, Srbija, Hrvatska, Bosna i Hercegovina, Balkanci" />

        <meta name="author" content="Kursor" />

        <meta property="og:title" content="Prijavite se za učenje engleskog jezika sa Kursorom" />
        <meta property="og:description" content="Pristupite besplatnim testovima i lekcijama engleskog jezika sa Kursor platforme. Prijavite se sada i unapredite svoje jezičke veštine!" />
        <meta property="og:image" content="URL to an image representing login" />
        <meta property="og:url" content="https://www.vasastranicatestiranje.com/login" />
        <meta property="og:type" content="website" />


        <meta name="geo.region" content="RS" />
        <meta name="geo.region" content="HR" />
        <meta name="geo.region" content="BA" />
        <meta name="geo.placename" content="Balkan" />
        <meta name="robots" content="index, follow" />

        <title>Online Platforma za Ucenje Engleskog</title>
      </head>
      <body>
        <div className="flex bg-pattern">
          {/* Sidebar is always visible */}
          <Sidebar />

          {/* Content area - Adjust margin to prevent overlapping */}
          <div className="flex-1 p-4 ml-16 md:ml-64">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}


