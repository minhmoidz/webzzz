import React from "react";
import "./MedicineList.scss";
import AddMedicineModal from "./AddMedicineModal";
import EditMedicineModal from "./EditMedicineModal";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";

const MedicineList = ({ medicines, onDelete, onEdit, currentPage, medicinesPerPage }) => {
  const startIndex = (currentPage - 1) * medicinesPerPage;
  const currentMedicines = medicines.slice(startIndex, startIndex + medicinesPerPage);

  return (
    <table className="medicine-list">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tên bệnh nhân</th>
          <th>SĐT</th>
          <th>Thuốc</th>
          <th>Số lượng</th>
          <th>Ngày xuất</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {currentMedicines.map((medicine) => (
          <tr key={medicine.invoiceDetailsId}>
            <td>{medicine.invoiceDetailsId}</td>
            <td>{medicine.patientName}</td>
            <td>{medicine.patientPhone}</td>
            <td>{medicine.medicineName}</td>
            <td>{medicine.quantityDetails}</td>
            <td>{medicine.dateOfTrans}</td>
            <td>
              <button onClick={() => onEdit(medicine)}>Sửa</button>
              <button onClick={() => onDelete(medicine.invoiceDetailsId)}>Xóa</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MedicineList;
