import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./EditMedicineModal.scss";
import AddMedicineModal from "./AddMedicineModal";
import MedicineList from "./MedicineList";
import Pagination from "./Pagination";

const EditMedicineModal = ({ medicine, onClose, onUpdate }) => {
  const [updatedMedicine, setUpdatedMedicine] = useState(medicine);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost:8080/api/invoice-details/${medicine.invoiceDetailsId}`, updatedMedicine)
      .then((response) => {
        toast.success("Cập nhật đơn thuốc thành công!");
        onUpdate(response.data);
        onClose();
      })
      .catch(() => toast.error("Lỗi khi cập nhật đơn thuốc!"));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sửa đơn thuốc</h2>
        <input
          type="text"
          name="patientName"
          value={updatedMedicine.patientName || ""}
          placeholder="Tên bệnh nhân"
          onChange={handleChange}
        />
        <input
          type="text"
          name="patientPhone"
          value={updatedMedicine.patientPhone || ""}
          placeholder="Số điện thoại"
          onChange={handleChange}
        />
        {/* Các trường input khác */}
        <button onClick={handleSave}>Lưu</button>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default EditMedicineModal;
