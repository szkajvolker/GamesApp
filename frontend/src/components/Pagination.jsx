const Pagination = ({ currentPage, totalPages, onPageChange, disabled }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
    window.scrollTo({ top: 750, behavior: "smooth" });
  };
  return (
    <div className="flex gap-2 justify-center my-4">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="bg-blue-900 rounded-xl p-2 cursor-pointer hover:bg-blue-700"
        hidden={currentPage === 1}
      >
        <span className="text-white">PREV</span>
      </button>
      <span className="text-white font-bold p-2">
        {currentPage}/{totalPages}
      </span>
      <button
        disabled={disabled || currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="bg-blue-900 rounded-xl p-2 cursor-pointer hover:bg-blue-700"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
