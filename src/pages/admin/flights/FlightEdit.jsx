import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Toast from "../../../components/common/Toast";
import { useAdminAuth } from "../../../context/AdminAuthContext";

const classTypes = ["Economy", "Premium Economy", "Business", "First"];
const statuses = ["Scheduled", "Delayed", "Cancelled", "Completed"];

const FlightEdit = () => {
  const { id } = useParams();
  const { state } = useLocation();
  const { getDataApi, updateApi } = useAdminAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    aircraftType: "",
    departureCity: "",
    arrivalCity: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    arrivalTime: "",
    classType: "",
    totalSeats: "",
    availableSeats: "",
    mealIncluded: false,
    price: "",
    discount: "",
    images: [],
    status: "",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const flightFromList = state?.flight;

  const formatDateTimeLocal = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const offset = date.getTimezoneOffset();
    const localDate = new Date(date.getTime() - offset * 60000);
    return localDate.toISOString().slice(0, 16); // "YYYY-MM-DDTHH:MM"
  };

  useEffect(() => {
    if (flightFromList) {
      setFormData({
        ...flightFromList,
        departureTime: formatDateTimeLocal(flightFromList.departureTime),
        arrivalTime: formatDateTimeLocal(flightFromList.arrivalTime),
      });
    } else {
      fetchFlightData();
    }
  }, [flightFromList]);

  const fetchFlightData = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await getDataApi(`/api/flight/${id}`, token);
      if (res.success) {
        setFormData({
          ...res.data,
          departureTime: formatDateTimeLocal(res.data.departureTime),
          arrivalTime: formatDateTimeLocal(res.data.arrivalTime),
        });
      }
    } catch (error) {
      console.error("Failed to fetch flight", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "images") {
      setFormData({ ...formData, images: Array.from(files) });
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
        } else {
          formToSend.append(key, formData[key]);
        }
      }

      const res = await updateApi(
        `/api/flight/update/${id}`,
        formToSend,
        token
      );
      if (res.success) {
        setResult({
          success: true,
          message: res.message || "Flight updated successfully",
        });
        navigate("/flight/admin/list");
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
        <h1 className="text-2xl font-bold mb-6">Edit Flight</h1>

        {[
          { label: "Flight Number", name: "flightNumber" },
          { label: "Airline", name: "airline" },
          { label: "Aircraft Type", name: "aircraftType" },
          { label: "Departure City", name: "departureCity" },
          { label: "Arrival City", name: "arrivalCity" },
          { label: "Departure Airport", name: "departureAirport" },
          { label: "Arrival Airport", name: "arrivalAirport" },
        ].map(({ label, name }) => (
          <InputField
            key={name}
            label={label}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            required
          />
        ))}

        {["departureTime", "arrivalTime"].map((field) => (
          <InputField
            key={field}
            label={field.replace("Time", " Time")}
            name={field}
            type="datetime-local"
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}

        <SelectField
          label="Class Type"
          name="classType"
          options={classTypes}
          value={formData.classType}
          onChange={handleChange}
          required
        />

        {["totalSeats", "availableSeats", "price", "discount"].map((field) => (
          <InputField
            key={field}
            label={field.replace(/([A-Z])/g, " $1")}
            name={field}
            type="number"
            min={0}
            value={formData[field]}
            onChange={handleChange}
            required
          />
        ))}

        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="mealIncluded"
            checked={formData.mealIncluded}
            onChange={handleChange}
          />
          <label className="text-gray-700">Meal Included</label>
        </div>

        <SelectField
          label="Status"
          name="status"
          options={statuses}
          value={formData.status}
          onChange={handleChange}
          required
        />

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

        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-sm font-medium text-gray-700"
          >
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="mt-1 block w-full p-2 border-4 rounded-md"
          />

          {formData.images.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {formData.images.map((img, idx) => (
                <img
                  key={idx}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt={`Flight Image ${idx + 1}`}
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
            loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Updating..." : "Update Flight"}
        </button>
      </form>

      <Toast result={result} setResult={setResult} />
    </AdminLayout>
  );
};

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
    <label htmlFor={name} className="block font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-4 rounded-md"
      {...rest}
    />
  </div>
);

const SelectField = ({
  label,
  name,
  value,
  options,
  onChange,
  required = false,
}) => (
  <div className="mb-4">
    <label className="block font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-4 rounded-md"
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FlightEdit;
