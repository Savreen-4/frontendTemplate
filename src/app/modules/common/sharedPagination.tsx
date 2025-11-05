import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './sharedPagination.css'; // Import your custom styles if needed

const SharedPagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageItems = () => {
    const pageItems: React.ReactNode[] = [];
    const delta = 2; // Number of pages to show around the current page

    // Add "1" and ..." before current range if needed
    if (currentPage > delta + 1) {
      pageItems.push(
        <Pagination.Item key={1} onClick={() => onPageChange(1)}>
          1
        </Pagination.Item>
      );
      if (currentPage > delta + 2) {
        pageItems.push(<Pagination.Ellipsis key="start-dots" disabled />);
      }
    }

    for (
        let page = Math.max(1, currentPage - delta); // Ensure the range starts at 1
        page <= Math.min(totalPages, currentPage + delta); // Ensure the range doesn't exceed totalPages
        page++
      ) {
        pageItems.push(
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => page !== currentPage && onPageChange(page)} // Prevent clicking on the current page
          >
            {page}
          </Pagination.Item>
        );
      }
      
    // Add "..." and last page if needed
    if (currentPage < totalPages - delta) {
      if (currentPage < totalPages - delta - 1) {
        pageItems.push(<Pagination.Ellipsis key="end-dots" disabled />);
      }
      pageItems.push(
        <Pagination.Item key={totalPages} onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageItems;
  };

  return (
    <div className="d-flex justify-content-end mt-4 me-3">
      <Pagination size="sm" className="custom-pagination">
        {/* Previous Button */}
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </Pagination.Prev>

        {/* Page Numbers with Dots */}
        {getPageItems()}

        {/* Next Button */}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </Pagination.Next>
      </Pagination>
    </div>
  );
};

export default SharedPagination;
