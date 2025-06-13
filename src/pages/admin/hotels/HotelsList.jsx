import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import AdminLayout from "../layout/AdminLayout";
import InfoCard from "../../../components/common/InfoCard";
import Modal from "../../../components/common/Modal";
import Toast from "../../../components/common/Toast";

const HotelsList = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState(null);

  const { getDataApi, deleteApi } = useAdminAuth();
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const getHotelData = async () => {
    try {
      const res = await getDataApi("/api/hotel/list", token);
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
    if (!selectedHotelId) return;

    try {
      const res = await deleteApi(
        `/api/hotel/delete/${selectedHotelId}`,
        token
      );
      if (res.success) {
        setResult(res);
        getHotelData();
      } else {
        console.error("Failed to delete hotel:", res.message);
      }
    } catch (error) {
      console.error("Error deleting hotel:", error);
    } finally {
      setShowModal(false);
      setSelectedHotelId(null);
    }
  };

  useEffect(() => {
    getHotelData();
  }, []);

  const handleEdit = (item) => {
    navigate(`/hotel/admin/edit/${item._id}`, { state: { hotel: item } });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">List Hotels</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((item, id) => (
          <InfoCard
            key={id}
            data={item}
            showActions={true}
            onEdit={() => handleEdit(item)}
            onDelete={() => {
              setSelectedHotelId(item._id);
              setShowModal(true);
            }}
          />
        ))}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedHotelId(null);
          }}
          message="Are you sure you want to delete this hotel?"
          onConfirm={handleConfirmDelete}
        />
        <Toast result={result} setResult={setResult} />
      </div>
    </AdminLayout>
  );
};

export default HotelsList;
