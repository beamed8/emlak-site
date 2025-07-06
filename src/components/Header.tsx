// components/Header.tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <a className="text-2xl font-bold text-blue-600">EmlakSite</a>
        </Link>
        <nav className="hidden md:flex space-x-6">
          <Link href="/kategori">
            <a className="hover:text-blue-600">Kategoriler</a>
          </Link>
          <Link href="/iletisim">
            <a className="hover:text-blue-600">İletişim</a>
          </Link>
        </nav>
        <button className="md:hidden">
          {/* Hamburger ikonu */}
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
}
