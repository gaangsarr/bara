// components/Footer.tsx
import React from "react";
import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#005792] text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold mb-4">BARA</h3>
            <p className="text-gray-200 text-sm leading-relaxed">
              Building innovative solutions for a better tomorrow. We are
              committed to excellence and quality in everything we do.
            </p>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/itpln"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/school/stt-pln/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#about"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#fact"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Fact
                </Link>
              </li>
              <li>
                <Link
                  href="#our-team"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-gray-200 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span className="text-gray-200">Jakarta, Indonesia</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 shrink-0" />
                <a
                  target="_blank"
                  href="https://wa.me/628123456789"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  +62 812-3456-7890
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href="mailto:baraproject@itpln.ac.id"
                  className="text-gray-200 hover:text-white transition-colors"
                >
                  baraproject@itpln.ac.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-200">
              © {currentYear} BARA. All rights reserved.
            </p>
            <a
              href="https://itpln.ac.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              Institut Teknologi PLN
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
