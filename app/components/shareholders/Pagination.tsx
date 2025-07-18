import { Link } from "@remix-run/react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <Link
        to={`?page=${currentPage - 1}`}
        className={`px-4 py-2 rounded transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        aria-disabled={currentPage === 1}
        preventScrollReset
      >
        Previous
      </Link>

      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>

      <Link
        to={`?page=${currentPage + 1}`}
        className={`px-4 py-2 rounded transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
        aria-disabled={currentPage === totalPages}
        preventScrollReset
      >
        Next
      </Link>
    </div>
  );
}
