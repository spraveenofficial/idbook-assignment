import React from "react";

interface PaginationProps {
  totalPages: number; // This will come from your API
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  totalData: number;
  limit: number;
  setLimit?: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalData,
  setLimit,
  limit,
}) => {
  // Limit number of pages shown
  const pageNumbers: any = [];

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // First page
      i === totalPages || // Last page
      (i >= currentPage - 1 && i <= currentPage + 1) // Current, previous and next page
    ) {
      pageNumbers.push(i);
    }
  }

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handleBack = () => currentPage > 1 && setCurrentPage(currentPage - 1);
//   const handleLimit = (e: any) => setLimit && setLimit(e.target.value);

  return (
    <div className="flex justify-between px-4 py-2 w-full">
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={handleBack}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "text-primary cursor-not-allowed"
              : "text-primary hover:dark:bg-gray-600"
          }`}
          disabled={currentPage === 1}
        >
          &lt;
        </button>

        {pageNumbers.map((page: number, index: number) => (
          <React.Fragment key={page}>
            {index > 0 && pageNumbers[index - 1] !== page - 1 ? (
              <span className="text-primary">...</span>
            ) : null}
            <button
              className={`px-3 py-1 rounded-md text-xs ${
                currentPage === page
                  ? "dark:bg-gray-700 text-primary bg-slate-100"
                  : "text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          </React.Fragment>
        ))}

        <button
          onClick={handleNext}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "text-primary cursor-not-allowed"
              : "text-primary dark:hover:bg-gray-600"
          }`}
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
      <div className="flex justify-center items-center gap-4">
        <p className="text-grey text-xs">
          Showing {currentPage > 1 ? (currentPage - 1) * limit + 1 : 1} To{" "}
          {Math.min(currentPage * limit, totalData)} Of {" "}
          {totalData} Users
        </p>
      </div>
    </div>
  );
};

export default Pagination;
