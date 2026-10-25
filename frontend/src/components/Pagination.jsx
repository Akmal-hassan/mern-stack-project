import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  totalItems = 0,
  itemsPerPage = 8,
  itemLabel = 'products'
}) {
  if (totalPages <= 1 && totalItems <= itemsPerPage) {
    return null;
  }

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = totalItems > 0 ? Math.min(currentPage * itemsPerPage, totalItems) : 0;

  // Generate pagination page numbers with smart ellipsis
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  const handlePageClick = (page) => {
    if (page === '...' || page === currentPage || page < 1 || page > totalPages) {
      return;
    }
    onPageChange(page);
  };

  return (
    <nav className="pagination-wrapper" aria-label="Products pagination">
      {totalItems > 0 && (
        <div className="pagination-info">
          Showing <span className="pagination-highlight">{startItem}</span> to{' '}
          <span className="pagination-highlight">{endItem}</span> of{' '}
          <span className="pagination-highlight">{totalItems}</span> {itemLabel}
        </div>
      )}

      <div className="pagination-controls">
        <button
          type="button"
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage <= 1}
          className="pagination-btn pagination-prev-btn"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
          <span>Prev</span>
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map((page, index) => {
            if (page === '...') {
              return (
                <span key={`ellipsis-${index}`} className="pagination-ellipsis">
                  &hellip;
                </span>
              );
            }

            const isActive = page === currentPage;
            return (
              <button
                key={`page-${page}`}
                type="button"
                onClick={() => handlePageClick(page)}
                className={`pagination-page-btn ${isActive ? 'active' : ''}`}
                aria-current={isActive ? 'page' : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="pagination-btn pagination-next-btn"
          aria-label="Next page"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
