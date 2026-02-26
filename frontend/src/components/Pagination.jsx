import { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange, disabled }) => {
  const [inputValue, setInputValue] = useState("");

  const getPageNumbers = (currentPage, totalPages) => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 4) pages.push("...");
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 3) pages.push("...");
      pages.push(totalPages);
    }
    return pages;
  };

  const handleJumpToPage = () => {
    const page = Number(inputValue);
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  useEffect(() => {
    setInputValue("");
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    window.scrollTo({ top: 900, behavior: "smooth" });
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-0.5 mt-25 mb-10">
      <button
        disabled={disabled === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="flex dark:text-white text-gray-dark bg-white dark:bg-gray-dark shadow-xl font-bold rounded-xl p-2 mx-2 dark:hover:text-gray-darker dark:hover:bg-gray-soft  hover:bg-gray-dark hover:text-white cursor-pointer"
      >
        Prev
      </button>
      {pages.map((page, i) =>
        page === "..." ? (
          <input
            key={`${page}-${i}`}
            type="text"
            min={1}
            max={Number.isFinite(totalPages) ? totalPages : 1}
            value={inputValue}
            placeholder="..."
            onFocus={() => {
              if (inputValue === "..." || inputValue === "") setInputValue("");
            }}
            onBlur={() => {
              if (inputValue === "") setInputValue("");
            }}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) setInputValue(val);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && /^\d+$/.test(inputValue)) {
                handleJumpToPage();
              }
            }}
            style={{ width: 60 }}
            className="bg-gray-800 p-2 text-center text-white hover:bg-gray-700"
            disabled={page === currentPage}
          />
        ) : (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              fontWeight: page === currentPage ? "bold" : "normal",
            }}
            disabled={page === currentPage}
            className={` p-2  ${
              page === currentPage
                ? "bg-gray-900 text-purple-600"
                : "bg-gray-800 hover:bg-gray-700 cursor-pointer text-white"
            }`}
          >
            {Number.isFinite(page) ? page : ""}
          </button>
        ),
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="flex dark:text-white text-gray-dark bg-white dark:bg-gray-dark shadow-xl font-bold rounded-xl p-2 mx-2  dark:hover:text-gray-darker dark:hover:bg-gray-soft  hover:bg-gray-dark hover:text-white cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
