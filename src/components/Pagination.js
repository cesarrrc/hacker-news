import React from "react";

const Pagination = ({ pagination, handleNextPage, currentPage }) => {
  return (
    <div className="pagination">
      <button className="page-item" onClick={() => handleNextPage(0)}>
        {"<<"}
      </button>
      {pagination.listOfPages.map((page) => (
        <button
          key={page}
          onClick={() => handleNextPage(page - 1)}
          className={`page-item ${currentPage === page - 1 && "selected"}`}
        >
          {page}
        </button>
      ))}
      <button
        className="page-item"
        onClick={() => handleNextPage(pagination.totalPages - 1)}
      >
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;
