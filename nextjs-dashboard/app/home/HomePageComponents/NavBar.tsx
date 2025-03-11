'use client';

import { useState, useEffect, useRef } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('up');

  const lastScrollY = useRef(0); // Use useRef to store scroll position without causing re-renders

  const toggleMenu = () => setIsOpen(!isOpen);
  const router = useRouter();

  const handleLogInClick = () => {
    const token = sessionStorage.getItem(process.env.AUTH_TOKEN || "");
    if (token) {
      router.push('/pages/dashboard');
    } else {
      router.push('/login');
    }
  };


  const handleScroll = () => {
    if (window.scrollY > lastScrollY.current) {
      setScrollDirection('down'); // Scrolling down, hide navbar
      setIsOpen(false);
    } else {
      setScrollDirection('up'); // Scrolling up, show navbar
    }
    lastScrollY.current = window.scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return (
    <nav
      className={`ml-8 mr-8 w-6xl box-border sm:w z-50 nav-bg rounded-md mx-auto drop-shadow-xl p-4 flex justify-between items-center sticky transition-all duration-300 ease-in-out ${scrollDirection === 'down' ? '-top-20 opacity-0' : 'top-0 opacity-100 shadow-md'
        }`}
    >
      {/* Logo Section */}
      <div className="flex items-center space-x-2">
        <Image
          src="/kursor-logo-light.png"
          alt="Kursor Logo"
          width={150}
          height={50}
          className="sm:w-40 md:w-44 lg:w-40 h-auto"
        />
      </div>

      {/* Hamburger Icon for Mobile */}
      <button onClick={toggleMenu} className="md:hidden text-neutral-800 focus:outline-none">
        <Bars3Icon className="h-10 w-10" />
      </button>

      {/* Navigation Links - Always Visible on Larger Screens */}
      <div className="hidden md:flex md:items-center md:space-x-6">
        <Link href="/" className="text-neutral-800 text-lg hover:text-pink-600">
          O nama
        </Link>
        <Link href="/adultpricing" className="text-neutral-800 text-lg hover:text-pink-600">
          Kursevi Za Odrasle
        </Link>
        <Link href="/kidspricing" className="text-neutral-800 text-lg hover:text-pink-600">
          Program za Decu
        </Link>
        <Link href="#contactSection" className="text-neutral-800 text-lg hover:text-pink-600">
          Kontaktirajte nas
        </Link>
        <Link href="/testpage" className="text-neutral-800 text-lg hover:text-pink-600">
          Test
        </Link>
      </div>

      {/* Auth Buttons - Always Visible on Larger Screens */}
      <div className="hidden md:flex md:items-center md:space-x-4">
        <button
          onClick={handleLogInClick}
          className="px-4 py-2 sign-up border-2 font-semibold rounded-lg shadow-md "
        >
          Prijavite se
        </button>
        {/* <button
          onClick={handleRegisterClick}
          className="px-4 py-2 download font-semibold rounded-lg shadow-md"
        >
          Sign Up
        </button> */}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-white p-4 flex flex-col space-y-4 md:hidden">
          <Link href="/" onClick={toggleMenu} className="text-neutral-800 text-xl hover:text-pink-600">
            O nama
          </Link>
          <Link href="/adultpricing" onClick={toggleMenu} className="text-neutral-800 text-xl hover:text-pink-600">
            Kursevi za odrasle
          </Link>
          <Link href="/kidspricing" onClick={toggleMenu} className="text-neutral-800 text-xl hover:text-pink-600">
            Kursevi za decu
          </Link>
          <Link href="#contactSection" onClick={toggleMenu} className="text-neutral-800 text-xl hover:text-pink-600">
            Kontaktirajte nas
          </Link>
          <button
            onClick={handleLogInClick}
            className="px-4 py-2 logout border-2 font-semibold rounded-lg shadow-md"
          >
            Prijavite se
          </button>
          {/* <button
            onClick={handleRegisterClick}
            className="px-4 py-2 bgc text-white font-semibold rounded-lg shadow-md hover:bg-white hover:text-neutral-800"
          >
            Sign Up
          </button> */}
        </div>
      )}
    </nav>
  );
}
