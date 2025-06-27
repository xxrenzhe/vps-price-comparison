import Link from "next/link";
import { Twitter, MessageCircle, Rss, Mail } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Best VPS List
          </Link>

          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://twitter.com/bestvpslist"
              className="text-blue-500 hover:text-blue-700 transition-colors"
              title="Twitter"
            >
              <Twitter size={20} />
            </Link>
            <Link
              href="https://reddit.com/r/bestvpslist"
              className="text-orange-500 hover:text-orange-700 transition-colors"
              title="Reddit"
            >
              <MessageCircle size={20} />
            </Link>
            <Link
              href="/main.rss"
              className="text-amber-500 hover:text-amber-700 transition-colors"
              title="RSS"
            >
              <Rss size={20} />
            </Link>
            <Link
              href="/newsletter"
              className="text-green-500 hover:text-green-700 transition-colors"
              title="Email"
            >
              <Mail size={20} />
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex space-x-8 pb-4">
          <Link
            href="/"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            href="/providers"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Providers
          </Link>
          <Link
            href="/blog"
            className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
          >
            Blog
          </Link>
        </div>
      </div>
    </nav>
  );
}
