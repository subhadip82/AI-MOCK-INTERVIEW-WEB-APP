"use client";
import React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className=" text-black-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          <h2 className="text-xl font-bold text-black">
            AI Mock Interview <span className="text-indigo-500">Platform</span>
          </h2>
          <nav className="flex gap-6 mt-4 md:mt-0">
            <a href="/about" className="hover:text-black transition">About</a>
            <a href="/tests" className="hover:text-black transition">Tests</a>
            <a href="/contact" className="hover:text-black transition">Contact</a>
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <p className="text-sm text-black-400">
            © {new Date().getFullYear()} AI Mock Test. All rights reserved.
          </p>
          <div className="flex gap-5 mt-4 md:mt-0">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
              <FaGithub size={20} />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
