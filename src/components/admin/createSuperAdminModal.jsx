import React from "react";

const TextareaField = ({ label, name, value, onChange, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="mt-1 block w-full p-2 border-2 rounded-md focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
);

const CreateSuperAdminModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    logincode: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Super Admin Data:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <h2 className="text-xl font-semibold mb-4">Create Super Admin</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <TextareaField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextareaField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextareaField
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <TextareaField
            label="Logincode (5 characters)"
            name="logincode"
            value={formData.logincode}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="cursor-pointer w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Create Super Admin
          </button>
        </form>

        <button
          onClick={onClose}
          className="cursor-pointer absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default CreateSuperAdminModal;
