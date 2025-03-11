'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  VideoCameraIcon,
  ChatBubbleLeftRightIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  ArrowRightOnRectangleIcon
} from '@heroicons/react/24/solid';

export default function Sidebar() {
  const router = useRouter();
  const [active, setActive] = useState('');

  useEffect(() => {
    setActive(window.location.pathname); // Set active item based on URL
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
    localStorage.setItem('logout', Date.now().toString());
    router.replace('/');
  };

  useEffect(() => {
    const handleStorageEvent = (event: StorageEvent) => {
      if (event.key === 'logout') {
        sessionStorage.removeItem(process.env.AUTH_TOKEN || "");
        router.replace('/');
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      window.removeEventListener('storage', handleStorageEvent);
    };
  }, [router]);

  return (
    <div className="h-screen bgc w-16 md:w-64 sm:w-48 text-white fixed flex flex-col">
      {/* Sidebar content */}
      <div className="flex flex-col flex-grow">
        {/* Logo */}
        <div className="p-4 md:p-6 flex items-center justify-center md:justify-start">
          <Link href="/" className="flex items-center">
            {/* Logo for larger screens */}
            <img
              src="/kursor-logo-dark.png"
              className="h-16 w-full hidden md:block"
              alt="Kursor Logo"
            />
            {/* Logo for smaller screens */}
            <img
              src="/cursor.png"
              className="h-10 w-full md:hidden"
              alt="Kursor Logo"
            />
          </Link>
        </div>


        {/* Navigation */}
        <nav className="flex flex-col items-center md:items-start">
          <ul className="w-full">
            <li className="mb-4">
              <Link
                href="/pages/profile"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-2 md:px-4 py-2 w-full aa ${active === "/pages/profile" ? "active" : ""}`}
                onClick={() => setActive("/pages/profile")}
              >
                <UserCircleIcon className="h-6 w-6" />
                <span className="hidden md:inline ml-3">Profil</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/pages/dashboard"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-2 md:px-4 py-2 w-full aa ${active === "/pages/dashboard" ? "active" : ""}`}
                onClick={() => setActive("/pages/dashboard")}
              >
                <VideoCameraIcon className="h-6 w-6" />
                <span className="hidden md:inline ml-3">Predavanja</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/pages/engtests"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-2 md:px-4 py-2 w-full aa ${active === "/pages/engtests" ? "active" : ""}`}
                onClick={() => setActive("/pages/engtests")}
              >
                <DocumentTextIcon className="h-6 w-6" />
                <span className="hidden md:inline ml-3">Testovi</span>
              </Link>
            </li>
            <li className="mb-4">
              <Link
                href="/pages/materials"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-2 md:px-4 py-2 w-full aa ${active === "/pages/materials" ? "active" : ""}`}
                onClick={() => setActive("/pages/materials")}
              >
                <CalendarDaysIcon className="h-6 w-6" />
                <span className="hidden md:inline ml-3">Zakazivanje Casova</span>
              </Link>
            </li>
            <li>
              <Link
                href="/pages/help"
                className={`flex flex-col md:flex-row items-center justify-center md:justify-start px-2 md:px-4 py-2 w-full aa ${active === "/pages/help" ? "active" : ""}`}
                onClick={() => setActive("/pages/help")}
              >
                <ChatBubbleLeftRightIcon className="h-6 w-6" />
                <span className="hidden md:inline ml-3">Podrska</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-2 md:p-6">
        <button
          onClick={handleLogout}
          className="flex items-center px-2 md:px-4 py-2 w-full text-left logout rounded"
        >
          <ArrowRightOnRectangleIcon className="h-6 w-6" />
          <span className="hidden md:inline ml-3">Izlogujte se</span>
        </button>
      </div>
    </div>
  );
}
