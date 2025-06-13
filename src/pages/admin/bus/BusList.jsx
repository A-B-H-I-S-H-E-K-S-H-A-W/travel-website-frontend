import AdminLayout from "../layout/AdminLayout";
import BusInfoCard from "../../../components/admin/BusInfoCard";
import { useEffect, useState } from "react";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import Modal from "../../../components/common/Modal";
import Toast from "../../../components/common/Toast";

const BusList = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedBusId, setSelectedBusId] = useState(null);

  const { getDataApi, deleteApi } = useAdminAuth();
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const getHotelData = async () => {
    try {
      const res = await getDataApi("/api/bus/buses", token);
      console.log(res);

      if (res.success) {
        setData(res.data);
      } else {
        console.error("Unexpected data format:", res);
        setData([]);
      }
    } catch (error) {
      console.log("Error fetching data ::::", error);
    }
  };

  const handleConfirmDelete = async () => {
    if (!selectedBusId) return;

    try {
      const res = await deleteApi(`/api/bus/delete/${selectedBusId}`, token);
      if (res.success) {
        setResult(res);
        getHotelData();
      } else {
        console.error("Failed to delete bus:", res.message);
      }
    } catch (error) {
      console.error("Error deleting bus:", error);
    } finally {
      setShowModal(false);
      setSelectedBusId(null);
    }
  };

  useEffect(() => {
    getHotelData();
  }, []);

  const handleEdit = (item) => {
    navigate(`/bus/admin/edit/${item._id}`, { state: { bus: item } });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">List Hotels</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((item, id) => (
          <BusInfoCard
            key={id}
            data={item}
            showActions={true}
            onEdit={() => handleEdit(item)}
            onDelete={() => {
              setSelectedBusId(item._id);
              setShowModal(true);
            }}
          />
        ))}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedBusId(null);
          }}
          message="Are you sure you want to delete this bus shedule?"
          onConfirm={handleConfirmDelete}
        />
        <Toast result={result} setResult={setResult} />
      </div>
    </AdminLayout>
  );
};

export default BusList;
