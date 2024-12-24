// import React, { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "./AddMedicineModal.scss";
// import EditMedicineModal from "./EditMedicineModal";
// import MedicineList from "./MedicineList";
// import Pagination from "./Pagination";

// const AddMedicineModal = ({ onClose, onSuccess }) => {
//   const [newMedicine, setNewMedicine] = useState({
//     patientName: "",
//     patientPhone: "",
//     medicineName: "",
//     medicineType: "",
//     quantityDetails: "",
//     dateOfTrans: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setNewMedicine((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAdd = () => {
//     axios
//       .post("http://localhost:8080/api/invoice-details", newMedicine)
//       .then((response) => {
//         toast.success("Thêm đơn thuốc thành công!");
//         onSuccess(response.data);
//         onClose();
//       })
//       .catch(() => toast.error("Lỗi khi thêm đơn thuốc!"));
//   };

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Thêm đơn thuốc</h2>
//         <input type="text" name="patientName" placeholder="Tên bệnh nhân" onChange={handleChange} />
//         {/* Các trường input khác tương tự */}
//         <button onClick={handleAdd}>Thêm</button>
//         <button onClick={onClose}>Đóng</button>
//       </div>
//     </div>
//   );
// };

// export default AddMedicineModal;
import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AddMedicineModal.scss";

const AddMedicineModal = ({ onClose, onSuccess }) => {
  const [newMedicine, setNewMedicine] = useState({
    patientName: "",
    patientPhone: "",
    medicineName: "",
    medicineType: "",
    quantityDetails: "",
    dateOfTrans: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMedicine((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = () => {
    axios
      .post("http://localhost:8080/api/invoice-details", newMedicine)
      .then((response) => {
        toast.success("Thêm đơn thuốc thành công!");
        onSuccess(response.data);
        onClose();
      })
      .catch(() => toast.error("Lỗi khi thêm đơn thuốc!"));
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Thêm đơn thuốc</h2>
        <div className="form-group">
          <label>Tên bệnh nhân</label>
          <input
            type="text"
            name="patientName"
            placeholder="Tên bệnh nhân"
            onChange={handleChange}
            value={newMedicine.patientName}
          />
        </div>

        <div className="form-group">
          <label>Số điện thoại</label>
          <input
            type="text"
            name="patientPhone"
            placeholder="Số điện thoại bệnh nhân"
            onChange={handleChange}
            value={newMedicine.patientPhone}
          />
        </div>

        <div className="form-group">
          <label>Tên thuốc</label>
          <input
            type="text"
            name="medicineName"
            placeholder="Tên thuốc"
            onChange={handleChange}
            value={newMedicine.medicineName}
          />
        </div>

        <div className="form-group">
          <label>Loại thuốc</label>
          <input
            type="text"
            name="medicineType"
            placeholder="Loại thuốc"
            onChange={handleChange}
            value={newMedicine.medicineType}
          />
        </div>

        <div className="form-group">
          <label>Số lượng</label>
          <input
            type="number"
            name="quantityDetails"
            placeholder="Số lượng thuốc"
            onChange={handleChange}
            value={newMedicine.quantityDetails}
          />
        </div>

        <div className="form-group">
          <label>Ngày bán</label>
          <input
            type="date"
            name="dateOfTrans"
            onChange={handleChange}
            value={newMedicine.dateOfTrans}
          />
        </div>

        <div className="modal-actions">
          <button onClick={handleAdd} className="btn btn-add">
            Thêm
          </button>
          <button onClick={onClose} className="btn btn-close">
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMedicineModal;
