import React from "react";
import arrLeft from "/assets/images/arrow-left.svg";
import arrRight from "/assets/images/arrow-right.svg";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      // Ít trang: hiện hết
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return pages;
  };

  const handleClick = (page) => {
    if (page !== "..." && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-4">
      {/* Prev button */}
      <button
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 bg-[#F7F7F8]"
      >
        <img src={arrLeft} alt="" className="size-6" />
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => handleClick(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full border bg-white ${
            page === currentPage
              ? "bg-red-700 text-white"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          } ${page === "..." ? "pointer-events-none" : ""}`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-500 hover:bg-gray-100 bg-[#F7F7F8]"
      >
        <img src={arrRight} alt="" className="size-6" />
      </button>
    </div>
  );
};

export default Pagination;
