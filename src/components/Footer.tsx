import React from "react";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Top section: left + right */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8 text-gray-700 text-xs font-semibold gap-8">
          
          {/* Left Links */}
          <div className="flex flex-col space-y-2 items-center md:items-start">
            <a href="/profile" className="hover:underline">Profile</a>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
            <a href="/appointments" className="hover:underline">Appointments</a>
          </div>

          {/* Right Logo & Social */}
          <div className="flex flex-col items-center md:items-end">
            <img src="/logo.png" alt="Your Logo" className="h-10 mb-4" />
            <div className="flex space-x-6 text-gray-700">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom center copyright */}
        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} Carelink. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
