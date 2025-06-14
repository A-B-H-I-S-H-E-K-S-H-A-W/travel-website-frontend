import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import AdminLayout from "../layout/AdminLayout";
import InfoCard from "../../../components/common/InfoCard";
import Modal from "../../../components/common/Modal";
import Toast from "../../../components/common/Toast";
import RoomInfoCard from "../../../components/admin/RoomInfoCard";

const RoomList = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const { getDataApi, deleteApi } = useAdminAuth();
  const token = localStorage.getItem("adminToken");
  const navigate = useNavigate();

  const getroomData = async () => {
    try {
      const res = await getDataApi("/api/hotel/room/list", token);
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
    if (!selectedRoomId) return;

    try {
      const res = await deleteApi(
        `/api/hotel/room/delete/${selectedRoomId}`,
        token
      );
      if (res.success) {
        setResult(res);
        getroomData();
      } else {
        console.error("Failed to delete room:", res.message);
      }
    } catch (error) {
      console.error("Error deleting room:", error);
    } finally {
      setShowModal(false);
      setSelectedRoomId(null);
    }
  };

  useEffect(() => {
    getroomData();
  }, []);

  const handleEdit = (item) => {
    navigate(`/hotel/admin/room/edit/${item._id}`, { state: { room: item } });
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">List rooms</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {data.map((item, id) => (
          <RoomInfoCard
            key={id}
            data={item}
            showActions={true}
            onEdit={() => handleEdit(item)}
            onDelete={() => {
              setSelectedRoomId(item._id);
              setShowModal(true);
            }}
          />
        ))}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedRoomId(null);
          }}
          message="Are you sure you want to delete this room?"
          onConfirm={handleConfirmDelete}
        />
        <Toast result={result} setResult={setResult} />
      </div>
    </AdminLayout>
  );
};

export default RoomList;
