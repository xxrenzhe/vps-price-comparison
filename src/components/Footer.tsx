import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600 text-sm">
          <div className="flex items-center justify-center space-x-4">
            <Link href="/" className="hover:text-gray-800">
              CheapVPSList.com
            </Link>
            <span>|</span>
            <Link href="/about" className="hover:text-gray-800">
              About
            </Link>
            <span>|</span>
            <Link href="/contact" className="hover:text-gray-800">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
