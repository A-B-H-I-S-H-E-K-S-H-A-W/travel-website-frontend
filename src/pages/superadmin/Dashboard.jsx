import SuperAdminLayout from "./layout/Layout";

const AdminDashboard = () => {
  const token = localStorage.getItem("superAdminToken");
  console.log(token);

  return (
    <SuperAdminLayout>
      <div>Dashboard</div>
    </SuperAdminLayout>
  );
};

export default AdminDashboard;
