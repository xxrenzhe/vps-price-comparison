"use client";

import Link from "next/link";
import { Twitter, MessageCircle, Rss, Mail, Menu, X } from "lucide-react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useState } from "react";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            Best VPS List
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/providers"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Providers
            </Link>
            <Link
              href="/blog"
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors"
            >
              Blog
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="https://twitter.com/bestvpslist"
              className="text-gray-500 hover:text-blue-500 transition-colors"
              title="Twitter"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://reddit.com/r/bestvpslist"
              className="text-gray-500 hover:text-orange-600 transition-colors"
              title="Reddit"
            >
              <MessageCircle size={20} />
            </Link>
            <Link
              href="/main.rss"
              className="text-gray-500 hover:text-amber-500 transition-colors"
              title="RSS"
            >
              <Rss size={20} />
            </Link>
            <Link
              href="/newsletter"
              className="text-gray-500 hover:text-green-500 transition-colors"
              title="Email"
            >
              <Mail size={20} />
            </Link>
            <div className="border-l border-gray-200 dark:border-gray-700 h-6"></div>
            <ThemeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ThemeSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="ml-4 text-gray-800 dark:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/providers" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                Providers
              </Link>
              <Link href="/blog" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium transition-colors" onClick={() => setIsMenuOpen(false)}>
                Blog
              </Link>
            </div>
            <div className="flex items-center justify-center space-x-6 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
              <Link href="https://twitter.com/bestvpslist" className="text-gray-500 hover:text-blue-500 transition-colors" title="Twitter">
                <Twitter size={22} />
              </Link>
              <Link href="https://reddit.com/r/bestvpslist" className="text-gray-500 hover:text-orange-600 transition-colors" title="Reddit">
                <MessageCircle size={22} />
              </Link>
              <Link href="/main.rss" className="text-gray-500 hover:text-amber-500 transition-colors" title="RSS">
                <Rss size={22} />
              </Link>
              <Link href="/newsletter" className="text-gray-500 hover:text-green-500 transition-colors" title="Email">
                <Mail size={22} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
