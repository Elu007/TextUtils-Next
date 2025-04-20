"use client";

import Link from 'next/link';
import { Linkedin, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-4 dark:bg-neutral-800">
      {/* Social Links */}
      <div className="flex justify-center space-x-6 mb-2">
        <Link
          href="https://www.linkedin.com/in/sk-elaf-ahmed-bb85b0210/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition">
            <Linkedin className="w-5 h-5 text-gray-500 hover:text-blue-600" />
          </span>
        </Link>
        <Link
          href="https://github.com/Elu007"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
        >
          <span className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-neutral-700 dark:hover:bg-neutral-600 transition">
            <Github className="w-5 h-5 text-gray-500 hover:text-gray-800" />
          </span>
        </Link>
      </div>

      {/* Footer Text */}
      <p className="text-sm text-gray-500 dark:text-neutral-400">
        Developed by Sk Elaf Ahmed. All rights reserved under SEA Enterprise ® {new Date().getFullYear()}
      </p>
    </footer>
  );
}
