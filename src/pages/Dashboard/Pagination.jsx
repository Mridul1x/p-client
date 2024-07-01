const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div>
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => onPageChange(pageNumber)} // Call onPageChange with the new page number
          disabled={pageNumber === currentPage}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};
export default Pagination;
