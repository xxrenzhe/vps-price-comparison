import Link from "next/link";

const FOOTER_CONTENT = {
  COPYRIGHT_HOLDER: 'BestVPSList.com',
  LINKS: {
    ABOUT: { href: '/about', text: 'About' },
    CONTACT: { href: '/contact', text: 'Contact' },
  },
  ALL_RIGHTS_RESERVED: 'All rights reserved.',
};

export default function Footer() {
  return (
    <footer className="bg-white border-t py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center text-sm">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} {FOOTER_CONTENT.COPYRIGHT_HOLDER}. {FOOTER_CONTENT.ALL_RIGHTS_RESERVED}
          </p>
          <div className="flex space-x-4">
            <Link href={FOOTER_CONTENT.LINKS.ABOUT.href} className="text-gray-400 hover:text-white">{FOOTER_CONTENT.LINKS.ABOUT.text}</Link>
            <Link href={FOOTER_CONTENT.LINKS.CONTACT.href} className="hover:text-gray-800">
              {FOOTER_CONTENT.LINKS.CONTACT.text}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
