"use client";

import React from "react";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <button
        onClick={handlePrevious}
        className="bg-teal-400 text-blue-900 font-bold py-2 px-8 rounded-l-full disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="bg-teal-400 text-blue-900 font-bold py-2 px-8 rounded-r-full disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
