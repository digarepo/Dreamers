import { Link, useLocation } from "@remix-run/react";
import clsx from "clsx";

export function Sidebar({ isOpen, toggleSidebar }) {
  const { pathname } = useLocation();

  const navItems = [
    {
      name: "See All Shareholders",
      href: "/shareholders/new",
    },
    {
      name: "Shareholders",
      href: "/shareholders",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
    },
    {
      name: "Statements",
      href: "/statements",
      icon: (
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ];

  const isActive = (href) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div>
      {/* Toggle Button */}
      <button
        className="md:hidden p-2 text-gray-600 hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        {isOpen ? "Close" : "Open"} Sidebar
      </button>

      {/* Sidebar */}
      <div
        className={clsx(
          "fixed inset-y-0 left-0 bg-white shadow-lg transition-transform duration-300",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex-grow border-r border-gray-200 pt-5">
          <div className="flex-grow flex flex-col overflow-y-auto">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={clsx(
                    "group flex items-center px-3 py-2 text-sm rounded-md transition-colors",
                    isActive(item.href)
                      ? "bg-gray-100 text-gray-900 font-medium"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-normal"
                  )}
                >
                  <span className="mr-3 text-gray-500 group-hover:text-gray-700">
                    {item.icon}
                  </span>
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
