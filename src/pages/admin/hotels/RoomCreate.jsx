import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import { useAdminAuth } from "../../../context/AdminAuthContext";
import Toast from "../../../components/common/Toast";

const BED_TYPES = ["King Size", "Queen Size", "Twin"];
const PAYMENT_TYPES = ["Book now and pay online", "Book now and pay at hotel"];
const FACILITIES = ["WiFi", "TV", "AC", "Room Service", "Mini Bar", "Balcony"];

const RoomForm = () => {
  const { createApi, getDataApi } = useAdminAuth();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [hotels, setHotels] = useState([]);

  const [formData, setFormData] = useState({
    hotel: "",
    bedType: "",
    maxPerson: "",
    facilities: [],
    discount: 1,
    price: "",
    payment: "",
    image: [],
    totalRooms: "",
  });

  const fetchHotels = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await getDataApi("/api/hotel/list", token);
      if (res.success) {
        setHotels(res.data);
      }
    } catch (error) {
      console.error("Error fetching hotels", error);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "facilities") {
      const updated = checked
        ? [...formData.facilities, value]
        : formData.facilities.filter((f) => f !== value);
      setFormData({ ...formData, facilities: updated });
    } else if (type === "checkbox" && name === "booked") {
      setFormData({ ...formData, booked: checked });
    } else if (name === "images") {
      setFormData({ ...formData, [name]: Array.from(e.target.files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("adminToken");

      const res = await createApi("/api/hotel/create-room", formData, token);
      if (res.success) {
        setResult({ success: true, message: "Room created successfully" });
        setFormData({
          hotel: "",
          bedType: "",
          maxPerson: "",
          facilities: [],
          discount: 1,
          price: "",
          payment: "",
          image: [],
          totalRooms: "",
        });
      } else {
        setResult({
          success: false,
          message: res.message || "Something went wrong",
        });
      }
    } catch (err) {
      console.error("Error creating room:", err);
      setResult({ success: false, message: "Internal server error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <form className="max-w-3xl" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6">Create Room</h1>

        {/* Hotel Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Hotel</label>
          <select
            name="hotel"
            value={formData.hotel}
            onChange={handleChange}
            required
            className="block w-full border-4 rounded-md p-2"
          >
            <option value="">-- Select --</option>
            {hotels.map((hotel) => (
              <option key={hotel._id} value={hotel._id}>
                {hotel.name}
              </option>
            ))}
          </select>
        </div>

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
          value={formData.maxPerson}
          onChange={handleChange}
          required
        />

        {/* Facilities */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Facilities</label>
          <div className="grid grid-cols-2 gap-2">
            {FACILITIES.map((f) => (
              <label key={f} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="facilities"
                  value={f}
                  checked={formData.facilities.includes(f)}
                  onChange={handleChange}
                  className="cursor-pointer"
                />
                <span>{f}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price */}
        <InputField
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        {/* Discount */}
        <InputField
          label="Discount (%)"
          name="discount"
          value={formData.discount}
          onChange={handleChange}
          required
        />

        {/* Payment Type */}
        <SelectField
          name="payment"
          label="Payment Option"
          value={formData.payment}
          onChange={handleChange}
          options={PAYMENT_TYPES}
          required
        />

        {/* Image URL */}
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Total Rooms */}
        <InputField
          label="Total Rooms"
          name="totalRooms"
          value={formData.totalRooms}
          onChange={handleChange}
          required
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 px-4 rounded-md ${
            loading ? "bg-blue-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "Submitting..." : "Create Room"}
        </button>
      </form>

      <Toast result={result} setResult={setResult} />
    </AdminLayout>
  );
};

// Reusable Input
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
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
      className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

// Reusable Select
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
      className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
    >
      <option value="">-- Select --</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default RoomForm;
