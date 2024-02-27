import React, { useState, useEffect, FC } from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}
const Pagination: FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange }) => {
  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Constants for step and the number of pages to display on each side
  const step = 3;
  const displayPageCount = step * 2 + 1;

  // Function to handle the "Extend" logic
  const extendPagination = () => {
    const size = totalItems;
    const page = currentPage;
    return { size, page, step };
  };

  // Function to generate the pagination code
  const generatePaginationCode = () => {
    const { size, page, step } = extendPagination();
    console.log(size, page, step);

    const buttons: JSX.Element[] = [];

    // Function to add page numbers to the code
    const addPages = (start: number, end: number) => {
      for (let i = start; i < end; i++) {
        buttons.push(
          <a key={i} className={i === page ? "current" : ""} onClick={() => onPageChange(i)}>
            {i}
          </a>
        );
      }
    };

    if (size < step * 2 + 6) {
      addPages(1, size + 1);
    } else if (page < step * 2 + 1) {
      addPages(1, step * 2 + 4);
      buttons.push(<i key="dots1">...</i>);
      addPages(size - step * 2 - 1, size + 1);
    } else if (page > size - step * 2) {
      addPages(1, step * 2 + 2);
      buttons.push(<i key="dots2">...</i>);
      addPages(size - step * 2 - 2, size + 1);
    } else {
      addPages(1, step * 2 + 2);
      buttons.push(<i key="dots3">...</i>);
      addPages(page - step, page + step + 1);
      buttons.push(<i key="dots4">...</i>);
      addPages(size - step + 1, size + 1);
    }
    console.log(buttons);

    return buttons;
  };

  // Function to handle previous and next button clicks
  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < Math.ceil(totalItems / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    onPageChange(currentPage);
  }, [currentPage, onPageChange]);

  return (
    <div>
      <a onClick={handlePrevClick}>◄</a>
      {/* <span dangerouslySetInnerHTML={{ __html: generatePaginationCode() }} /> */}
      {generatePaginationCode()}
      <a onClick={handleNextClick}>►</a>
    </div>
  );
};

export default Pagination;
