import React, { useState } from "react";

const SearchBox = ({ onSearch, initialData }) => {
  const [formData, setFormData] = useState({
    source: "",
    destination: "",
    person: "1",
    ...initialData,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    if (onSearch && typeof onSearch === "function") {
      setLoading(true);
      await onSearch(formData);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="w-full md:h-16 md:rounded-full rounded-xl md:max-w-5xl mx-auto bg-white">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 text-center px-2 gap-2">
          {/* Source */}
          <div className="h-16 w-full flex flex-col items-start justify-center px-5">
            <label className="text-sm font-medium">Choose Location</label>
            <input
              type="text"
              name="source"
              value={formData.source}
              onChange={handleChange}
              className="border-4 rounded-xl w-full px-2"
              placeholder="Enter source"
            />
          </div>

          {/* Destination */}
          <div className="h-16 w-full flex flex-col items-start justify-center px-5">
            <label className="text-sm font-medium">Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              className="border-4 rounded-xl w-full px-2"
              placeholder="Enter destination"
            />
          </div>

          {/* Guest Count */}
          <div className="h-16 w-full col-span-2 flex flex-col items-start justify-center px-5">
            <label className="text-sm font-medium">Add Guest</label>
            <select
              name="person"
              value={formData.person}
              onChange={handleChange}
              className="border-4 rounded-xl w-full px-2"
            >
              {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                <option key={num} value={num}>
                  {num} People
                </option>
              ))}
            </select>
          </div>

          {/* Search Button */}
          <div className="h-16 col-span-2 md:col-auto flex justify-center items-center">
            <button
              onClick={handleSearch}
              disabled={loading}
              className={`cursor-pointer text-white bg-blue-600 hover:bg-blue-700 font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } md:px-16 sm:px-14 px-20 py-2 md:py-3 md:rounded-full rounded-xl transition-all duration-300`}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBox;
