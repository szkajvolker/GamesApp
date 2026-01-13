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
    window.scrollTo({ top: 975, behavior: "smooth" });
  };

  const pages = getPageNumbers(currentPage, totalPages);

  return (
    <div
      style={{ display: "flex", alignItems: "center" }}
      className="gap-0.5 mt-25"
    >
      <button
        disabled={disabled === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="p-2 font-bold text-gray-800 dark:text-white bg-linear-to-r from-purple-500 to-blue-500 rounded-2xl mr-2 hover:brightness-120 cursor-pointer"
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
            className="bg-gray-800 p-2 text-center text-white hover:bg-gray-700 border border-black"
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
            className={`border border-black p-2 text-white  ${
              page === currentPage
                ? "bg-gray-900"
                : "bg-gray-800 hover:bg-gray-700 cursor-pointer"
            }`}
          >
            {Number.isFinite(page) ? page : ""}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="p-2 font-bold dark:text-white text-gray-800 bg-linear-to-r from-purple-500 to-blue-500 rounded-2xl ml-2 hover:brightness-120 cursor-pointer"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
