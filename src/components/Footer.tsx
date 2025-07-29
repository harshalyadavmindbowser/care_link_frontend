import React from "react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-cyan-600 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-2">About carelink</h2>
          <p className="text-gray-400">Connecting doctors and patients.</p>
        </div>

        <div className="md:w-1/2 flex flex-col items-start md:items-end">
          <div className="mb-4 space-y-2 text-right">
            <a href="#" className="block hover:text-blue-400 transition">
              Dashboard
            </a>
            <a href="#" className="block hover:text-blue-400 transition">
              Appointments
            </a>
          </div>

          <div className="flex gap-4 mt-2">
            <a href="#" className="hover:text-blue-300 transition text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-blue-300 transition text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-blue-300 transition text-xl">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
