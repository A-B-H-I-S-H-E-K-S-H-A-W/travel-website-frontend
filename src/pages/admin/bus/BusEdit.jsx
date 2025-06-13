import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Toast from "../../../components/common/Toast";
import { useAdminAuth } from "../../../context/AdminAuthContext";

const BUS_TYPES = ["AC Sleeper", "Non-AC Seater", "Sleeper", "AC Seater"];
const OPERATING_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EditBusPage = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { updateApi, getDataApi } = useAdminAuth();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    busNumber: "",
    busName: "",
    source: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
    totalSeats: "",
    availableSeats: "",
    fare: "",
    busType: "",
    operatingDays: [],
    isActive: false,
    images: [],
  });

  const busFromList = state?.bus;

  useEffect(() => {
    if (busFromList) {
      setFormData(busFromList);
    } else {
      fetchBusData();
    }
  }, [busFromList]);

  const fetchBusData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await getDataApi(`/api/bus/${id}`, token);

      console.log(res);

      if (res.success) {
        setFormData(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch bus", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
    } else if (name === "operatingDays") {
      const updated = checked
        ? [...formData.operatingDays, value]
        : formData.operatingDays.filter((day) => day !== value);
      setFormData({ ...formData, operatingDays: updated });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
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

      const res = await updateApi(`/api/bus/update/${id}`, formToSend, token);

      if (res.success) {
        setResult({
          success: true,
          message: res.message || "Updated successfully",
        });
        navigate("/bus/admin/list");
      } else {
        setResult({ success: false, message: res.message || "Update failed" });
      }
    } catch (err) {
      console.error("Submit error", err);
      setResult({ success: false, message: "Update failed unexpectedly" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <form onSubmit={handleSubmit} className="max-w-4xl space-y-4">
        <h1 className="text-2xl font-bold mb-6">Create Bus Schedule</h1>

        <InputField
          label="Bus Number"
          name="busNumber"
          value={formData.busNumber}
          onChange={handleChange}
          required
        />
        <InputField
          label="Bus Name"
          name="busName"
          value={formData.busName}
          onChange={handleChange}
          required
        />
        <InputField
          label="Source"
          name="source"
          value={formData.source}
          onChange={handleChange}
          required
        />
        <InputField
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <InputField
          type="time"
          label="Departure Time"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
          required
        />
        <InputField
          type="time"
          label="Arrival Time"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          label="Total Seats"
          name="totalSeats"
          value={formData.totalSeats}
          onChange={handleChange}
          required
        />
        <InputField
          type="number"
          label="Fare (INR)"
          name="fare"
          value={formData.fare}
          onChange={handleChange}
          required
        />

        {/* Bus Type Select Dropdown (Single Select) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Bus Type <span className="text-red-500">*</span>
          </label>
          <select
            name="busType"
            value={formData.busType}
            onChange={handleChange}
            className="w-full p-2 border-4 rounded-md"
            required
          >
            <option value="" disabled>
              Select Bus Type
            </option>
            {BUS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Operating Days Checkboxes */}
        <CheckboxGroup
          label="Operating Days"
          name="operatingDays"
          options={OPERATING_DAYS}
          selected={formData.operatingDays}
          onChange={handleChange}
        />

        {/* Is Active Checkbox */}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="mr-2"
            />
            Is Active
          </label>
        </div>

        {/* Images Input */}
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
            className="mt-1 block w-full p-2 border-4 rounded-md"
          />

          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 my-4">
              {formData.images.map((img, idx) => (
                <img
                  key={idx}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt={`Bus Image ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-md border-2 border-blue-500"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full text-white py-2 px-4 rounded-md cursor-pointer ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update"}
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
  required = false,
  type = "text",
}) => (
  <div className="mb-4">
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-4 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const CheckboxGroup = ({ label, name, options, selected, onChange }) => (
  <div className="mb-4">
    <label className="block font-medium text-gray-700 mb-2">{label}</label>
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <label key={option} className="flex items-center space-x-2">
          <input
            type="checkbox"
            name={name}
            value={option}
            checked={selected.includes(option)}
            onChange={onChange}
            className="cursor-pointer"
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default EditBusPage;
