import React from "react";
import { Pagination as BootstrapPagination } from "react-bootstrap"; // Importing Bootstrap Pagination

import "./pagination.css";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  let pages = [];

  //                100/10 = 10 pages
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }
  return (
    <div className="pagination-container d-flex flex-column">
      <div className="d-flex justify-content-center mt-auto">
        <BootstrapPagination>
          <BootstrapPagination.Prev
            onClick={() =>
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)
            }
            disabled={currentPage === 1}
          />

          {pages.map((page) => (
            <BootstrapPagination.Item
              key={page}
              active={page === currentPage} // Highlight active page
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </BootstrapPagination.Item>
          ))}

          <BootstrapPagination.Next
            onClick={() =>
              setCurrentPage(
                currentPage < pages.length ? currentPage + 1 : pages.length
              )
            }
            disabled={currentPage === pages.length}
          />
        </BootstrapPagination>
      </div>
    </div>
  );
};

export default Pagination;
