"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from 'next/image';

const Footer = () => {
  return (
    <footer id="contactSection" className="footer-bg text-white py-12 px-4 ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Column 1: Logo and About */}
        <div>
          <Image src="/kursor-logo-dark.png" alt="Kursor Logo" width={180} height={80} />
          <p className="mt-4 text-neutral-300">
            Providing the best services to help you achieve your goals. Join us today!
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h3 className="text-xl font-semibold ">Linkovi</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="text-neutral-300 text-lg hover:text-pink-600">
                O nama
              </Link>
            </li>
            <li>
              <Link href="/adultpricing" className="text-neutral-300 text-lg hover:text-pink-600">
                Kursevi Za Odrasle
              </Link>
            </li>
            <li>
              <Link href="/kidspricing" className="text-neutral-300 text-lg hover:text-pink-600">
                Program za Decu
              </Link>
            </li>
            <li>
              <Link href="#contactSection" className="text-neutral-300 text-lg hover:text-pink-600">
                Kontaktirajte nas
              </Link>
            </li>
            <li>
              <Link href="/usloviodredbe" className="text-neutral-300 text-lg hover:text-pink-600">
                Uslovi i odredbe
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Social Media Links */}
        <div>
          <h3 className="text-xl font-semibold ">Zapratite nas</h3>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-neutral-300 hover:text-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              className="text-neutral-300 hover:text-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              className="text-neutral-300 hover:text-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              className="text-neutral-300 hover:text-pink-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
            </a>
          </div>
          <p className="mt-4 text-neutral-300">
            Kontaktirajte nas:{" "}
            <a href="mailto:contact@yourcompany.com" className="text-white">
              contact@yourcompany.com
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center">
        <p className="text-neutral-300">
          &copy; {new Date().getFullYear()} Kursor. Sva prava zadržana.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
