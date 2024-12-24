import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import AddMedicineModal from "./AddMedicineModal";
import EditMedicineModal from "./EditMedicineModal";
import MedicineList from "./MedicineList";
import Pagination from "./Pagination";
import "./MedicineTable.scss";


const MedicineTable = () => {
  const [medicines, setMedicines] = useState([]);
  const [latestMedicine, setLatestMedicine] = useState(null);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const medicinesPerPage = 14;

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/invoice-details")
      .then((response) => {
        const data = response.data;
        if (Array.isArray(data) && data.length > 0) {
          setMedicines(data);
          setLatestMedicine(data[0]);
        } else {
          toast.error("Dữ liệu không hợp lệ!");
        }
      })
      .catch(() => toast.error("Lỗi khi lấy dữ liệu!"));
  }, []);

  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const filteredMedicines = medicines.filter((medicine) => {
    const invoiceDetailsId = medicine?.invoiceDetailsId?.toString() || "";
    const patientName = medicine?.patientName?.toLowerCase() || "";
    return invoiceDetailsId.includes(searchTerm) || patientName.includes(searchTerm);
  });

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/invoice-details/${id}`)
      .then(() => {
        setMedicines((prev) => prev.filter((med) => med.invoiceDetailsId !== id));
        toast.success("Đã xóa đơn thuốc thành công!");
      })
      .catch(() => toast.error("Không thể xóa đơn thuốc. Vui lòng thử lại!"));
  };

  return (
    <div className="medicine-table-container">
      <div className="dashboard">
        {latestMedicine && (
          <div className="latest-medicine">
            <h3>Đơn thuốc gần nhất</h3>
            <div>
              <p>
                Bệnh nhân: <span>{latestMedicine.patientName || "Không có tên"}</span>
              </p>
              <p>
                SĐT: <span>{latestMedicine.patientPhone || "Không có số điện thoại"}</span>
              </p>
              <p>
                Thuốc: <span>{latestMedicine.medicineName || "Chưa có thuốc"}</span>
              </p>
              <p>
                Số lượng: <span>{latestMedicine.quantityDetails || "Chưa có số lượng"}</span>
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="actions">
        <input
          type="text"
          placeholder="Tìm theo ID hoặc tên bệnh nhân..."
          onChange={handleSearch}
        />
        <button onClick={() => setIsAddModalOpen(true)}>Thêm đơn xuất thuốc</button>
      </div>

      <MedicineList
        medicines={filteredMedicines}
        onDelete={handleDelete}
        onEdit={(medicine) => setSelectedMedicine(medicine)}
        currentPage={currentPage}
        medicinesPerPage={medicinesPerPage}
      />

      <Pagination
        totalItems={filteredMedicines.length}
        itemsPerPage={medicinesPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {isAddModalOpen && (
        <AddMedicineModal
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={(newMedicine) => setMedicines((prev) => [...prev, newMedicine])}
        />
      )}

      {selectedMedicine && (
        <EditMedicineModal
          medicine={selectedMedicine}
          onClose={() => setSelectedMedicine(null)}
          onUpdate={(updatedMedicine) =>
            setMedicines((prev) =>
              prev.map((med) =>
                med.invoiceDetailsId === updatedMedicine.invoiceDetailsId ? updatedMedicine : med
              )
            )
          }
        />
      )}
    </div>
  );
};

export default MedicineTable;
