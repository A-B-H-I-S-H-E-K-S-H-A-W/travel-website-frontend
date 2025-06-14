import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Toast from "../../../components/common/Toast";
import { useAdminAuth } from "../../../context/AdminAuthContext";

// Constants
const BED_TYPES = ["King Size", "Queen Size", "Twin"];
const PAYMENT_TYPES = ["Book now and pay online", "Book now and pay at hotel"];
const FACILITIES = ["WiFi", "TV", "AC", "Room Service", "Mini Bar", "Balcony"];

const EditRoomForm = () => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const { updateApi, getDataApi } = useAdminAuth();
  const roomFromList = state?.room;

  const [formData, setFormData] = useState({
    hotel: "",
    bedType: "",
    maxPerson: "",
    facilities: [],
    discount: 1,
    price: "",
    payment: "",
    images: [],
    totalRooms: "",
  });

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotelsList();
  }, []);

  useEffect(() => {
    if (roomFromList) {
      setFormData({
        ...roomFromList,
        hotel:
          typeof roomFromList.hotel === "object"
            ? roomFromList.hotel._id
            : roomFromList.hotel,
        facilities: roomFromList.facilities || [],
        image: roomFromList.image || [],
      });
    } else {
      fetchRoomDataFromAPI();
    }
  }, [hotels]);

  const fetchHotelsList = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await getDataApi("/api/hotel/list", token);
      if (res.success) {
        setHotels(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch hotels list", error);
    }
  };

  const fetchRoomDataFromAPI = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await getDataApi(`/api/hotel/room/${id}`, token);
      if (res.success) {
        const data = res.data;
        console.log(res.data);

        setFormData({
          ...data,
          hotel: typeof data.hotel === "object" ? data.hotel._id : data.hotel,
          facilities: data.facilities || [],
          image: data.image || [],
        });
      }
    } catch (error) {
      console.error("Failed to fetch room data", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "facilities") {
      const updated = checked
        ? [...formData.facilities, value]
        : formData.facilities.filter((f) => f !== value);
      setFormData({ ...formData, facilities: updated });
    } else if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("adminToken");
      const formToSend = new FormData();

      for (const key in formData) {
        if (key === "images") {
          formData.images.forEach((img) => formToSend.append("images", img));
        } else if (Array.isArray(formData[key])) {
          formData[key].forEach((val) => formToSend.append(key, val));
        } else {
          formToSend.append(key, formData[key]);
        }
      }

      const res = await updateApi(
        `/api/hotel/room/update/${id}`,
        formToSend,
        token
      );

      if (res.success) {
        setResult({ success: true, message: "Room updated successfully" });
        navigate("/hotel/admin/room/list");
      } else {
        setResult({ success: false, message: res.message || "Update failed" });
      }
    } catch (error) {
      console.error("Room update failed", error);
      setResult({ success: false, message: "Unexpected error during update" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <form className="max-w-4xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Update Room</h1>

        {/* Hotel Dropdown */}
        <SelectField
          name="hotel"
          label="Select Hotel"
          value={formData.hotel}
          onChange={handleChange}
          options={hotels.map((h) => ({ label: h.name, value: h._id }))}
          required
        />

        {/* Bed Type */}
        <SelectField
          name="bedType"
          label="Bed Type"
          value={formData.bedType}
          onChange={handleChange}
          options={BED_TYPES}
          required
        />

        {/* Max Person */}
        <InputField
          label="Max Person"
          name="maxPerson"
          type="number"
          value={formData.maxPerson}
          onChange={handleChange}
          required
        />

        {/* Facilities */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Facilities</label>
          <div className="grid grid-cols-2 gap-2">
            {FACILITIES.map((item) => (
              <label key={item} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="facilities"
                  value={item}
                  checked={formData.facilities.includes(item)}
                  onChange={handleChange}
                />
                <span>{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* Discount */}
        <InputField
          label="Discount (%)"
          name="discount"
          type="number"
          value={formData.discount}
          onChange={handleChange}
        />

        {/* Payment Type */}
        <SelectField
          name="payment"
          label="Payment Type"
          value={formData.payment}
          onChange={handleChange}
          options={PAYMENT_TYPES}
          required
        />

        {/* Total Rooms */}
        <InputField
          label="Total Rooms"
          name="totalRooms"
          type="number"
          value={formData.totalRooms}
          onChange={handleChange}
          required
        />

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Upload Room Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md"
          />
        </div>

        {formData.images.length > 0 && (
          <div className="grid grid-cols-3 gap-4 my-4">
            {formData.images.map((img, idx) => (
              <img
                key={idx}
                src={typeof img === "string" ? img : URL.createObjectURL(img)}
                alt={`Room Image ${idx + 1}`}
                className="w-full h-32 object-cover rounded-md border-2 border-blue-500"
              />
            ))}
          </div>
        )}

        <button
          disabled={loading}
          type="submit"
          className={`w-full  text-white py-2 px-4 rounded-md  ${
            loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Updating..." : "Update Room"}
        </button>
      </form>

      <Toast result={result} setResult={setResult} />
    </AdminLayout>
  );
};

// Reusable Input Field
const InputField = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
  ...rest
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-4 rounded-md"
      {...rest}
    />
  </div>
);

// Reusable Select Field
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-4 rounded-md"
    >
      <option value="">-- Select --</option>
      {options.map((opt) =>
        typeof opt === "string" ? (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ) : (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        )
      )}
    </select>
  </div>
);

export default EditRoomForm;
