import React from "react";
import "./Pagination.scss";
import AddMedicineModal from "./AddMedicineModal";
import EditMedicineModal from "./EditMedicineModal";
import MedicineList from "./MedicineList";

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}>
        &laquo;
      </button>
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          className={currentPage === index + 1 ? "active" : ""}
          onClick={() => handleClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}>
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
