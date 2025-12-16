"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { href: "/", label: "Home" },
    { href: "/3d-model", label: "3D Model" },
    { href: "#about", label: "About" },
    { href: "/#fact", label: "Fact" },
    { href: "/#our-team", label: "Our Team" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 w-full bg-linear-to-r from-[#13334C] to-[#005792] px-8 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50">
            <div className="rotate-90 relative w-[90%] min-w-13 max-w-[60px] aspect-1277/1952 transition-transform duration-300 ease-in-out hover:scale-110">
              <Image
                src="/BARALOGO-PUTIH.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Menu */}
          <ul className="hidden md:flex items-center gap-8 text-white font-medium">
            {menuItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-[#FD5F00] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white z-50 relative w-8 h-8 flex flex-col justify-center items-center"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out my-1 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute left-0 right-0 top-full bg-linear-to-r from-[#13334C] to-[#005792] overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col items-center gap-6 py-8 text-white font-medium">
            {menuItems.map((item, index) => (
              <li
                key={item.href}
                className={`transform transition-all duration-300 ${
                  isMenuOpen
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg hover:text-[#FD5F00] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Backdrop Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 md:hidden bg-black/50 z-49 h-full"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
