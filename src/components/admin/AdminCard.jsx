const AdminCard = () => {
  const admin = {
    username: "John Doe",
    email: "john@example.com",
    phoneNumber: "9876543210",
    companyName: "TravelBuddy Pvt Ltd",
    address: "123 Main Street, MG Road",
    pincode: "110011",
    city: "New Delhi",
    state: "Delhi",
    country: "India",
    pancardNumber: "ABCDE1234F",
    gstNumber: "22AAAAA0000A1Z5",
    license: "LIC12345678",
    verification: "Verified",
    domain: "Hotel",
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-full mb-5">
      <h2 className="text-2xl font-bold text-gray-800 mb-3">
        {admin.companyName}
      </h2>

      <div className="grid grid-cols-2 gap-2 text-base text-gray-700">
        <p>
          <span className="font-bold">Username:</span> {admin.username}
        </p>
        <p>
          <span className="font-bold">Email:</span> {admin.email}
        </p>
        <p>
          <span className="font-bold">Phone:</span> {admin.phoneNumber}
        </p>

        <p>
          <span className="font-bold">Address:</span> {admin.address},{" "}
          {admin.city}: {admin.pincode}
        </p>
        <p>
          <span className="font-bold">State:</span> {admin.state}
        </p>
        <p>
          <span className="font-bold">Country:</span> {admin.country}
        </p>
        <p>
          <span className="font-bold">PAN:</span> {admin.pancardNumber}
        </p>
        <p>
          <span className="font-bold">GST:</span> {admin.gstNumber}
        </p>
        <p>
          <span className="font-bold">Domain:</span> {admin.domain}
        </p>
        <p>
          <span className="font-bold">License:</span>{" "}
          <a className="text-blue-800 underline" href="">
            Download License
          </a>
        </p>
      </div>

      <div className="flex justify-between items-center mt-3">
        <p className="mt-4 text-xs text-gray-500">
          Created at: {new Date(admin.createdAt).toLocaleString()}
        </p>
        <div className="flex gap-3">
          <button className="px-4 py-1 rounded-md bg-green-500 text-white cursor-pointer hover:bg-green-600">
            Verify
          </button>
          <button className="px-4 py-1 rounded-md bg-red-500 text-white cursor-pointer hover:bg-red-600">
            Denied
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;
