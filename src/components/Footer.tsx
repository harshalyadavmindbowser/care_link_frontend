import React from "react";
import { FaTwitter, FaPinterestP, FaInstagram } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center mb-8">
          {/* Left links */}
          <div className="flex flex-col space-y-1 text-xs font-semibold text-gray-700">
            <a href="/profile" className="hover:underline">Profile</a>
            <a href="/dashboard" className="hover:underline">Dashboard</a>
            <a href="/appointments" className="hover:underline">Apoointments</a>
          </div>

          {/* Center logo and social icons */}
          <div className="flex flex-col items-center">
            <img
              src="/logo.png"
              alt="Your Logo"
              className="h-10 mb-4"
            />
            <div className="flex space-x-6 text-gray-700 mb-6">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-black"><FaTwitter size={20} /></a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-black"><FaPinterestP size={20} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-black"><FaInstagram size={20} /></a>
            </div>

         
          </div>

          {/* Right links */}
          <div className="flex flex-col space-y-1 text-xs font-semibold text-gray-700 text-right">
               <p className="text-xs font-semibold mb-2">Contact Us</p>
            <form className="flex border border-gray-400 rounded overflow-hidden w-[280px]">
              <input
                type="email"
                placeholder="name@email.com"
                className="px-4 py-2 flex-grow outline-none"
              />
              <button type="submit" className="bg-transparent border-l border-gray-400 px-4 font-semibold hover:bg-gray-200 transition">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
