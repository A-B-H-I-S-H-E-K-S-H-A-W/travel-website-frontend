import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import AdminLayout from "../layout/AdminLayout";
import InfoCard from "../../../components/common/InfoCard";
import Modal from "../../../components/common/Modal";
import Toast from "../../../components/common/Toast";
import FlightInfoCard from "../../../components/admin/FlightInfoCard";

const FlightsList = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedFlightId, setSelectedFlightId] = useState(null);

  const { getDataApi, deleteApi } = useAdminAuth();
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const getFlightData = async () => {
    try {
      const res = await getDataApi("/api/flight/list", token);
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
    if (!selectedFlightId) return;

    try {
      const res = await deleteApi(
        `/api/flight/delete/${selectedFlightId}`,
        token
      );
      if (res.success) {
        setResult(res);
        getFlightData();
      } else {
        console.error("Failed to delete Flight:", res.message);
      }
    } catch (error) {
      console.error("Error deleting Flight:", error);
    } finally {
      setShowModal(false);
      setSelectedFlightId(null);
    }
  };

  useEffect(() => {
    getFlightData();
  }, []);

  const handleEdit = (item) => {
    navigate(`/Flight/admin/edit/${item._id}`, { state: { flight: item } });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">List Flights</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((item, id) => (
          <FlightInfoCard
            key={id}
            data={item}
            showActions={true}
            onEdit={() => handleEdit(item)}
            onDelete={() => {
              setSelectedFlightId(item._id);
              setShowModal(true);
            }}
          />
        ))}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedFlightId(null);
          }}
          message="Are you sure you want to delete this Flight?"
          onConfirm={handleConfirmDelete}
        />
        <Toast result={result} setResult={setResult} />
      </div>
    </AdminLayout>
  );
};

export default FlightsList;
