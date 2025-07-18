// components/Header.tsx
import { useState } from "react";
import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

const navItems = [
  { name: "See All Shareholders", href: "/shareholders" },
  { name: "Register Shareholders", href: "/shareholders_new" },
  { name: "Statements", href: "/statements" },
  { name: "Reports", href: "/reports" },
  { name: "Settings", href: "/settings" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-10">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-white font-bold text-sm">DE</span>
            </div>
            <h1 className="ml-3 text-xl font-bold text-white hidden md:block">
              Dreamers ERP
            </h1>
          </div>
          <div className="hidden md:flex space-x-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "px-3 py-2 rounded-md text-sm whitespace-nowrap",
                  isActive(item.href)
                    ? "bg-gray-100 text-gray-900 font-medium"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center">
          <div className="md:hidden mr-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-700"
            >
              <span className="sr-only">Menu</span>
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center text-sm focus:outline-none"
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
              <span className="ml-2 text-white font-medium hidden sm:inline">
                Admin
              </span>
            </button>
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={clsx(
                  "block px-3 py-2 rounded-md text-base",
                  isActive(item.href)
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
