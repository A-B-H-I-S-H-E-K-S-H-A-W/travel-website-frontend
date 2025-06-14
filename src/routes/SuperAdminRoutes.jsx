// SuperAdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import SuperAdminAuth from "../pages/superadmin/SuperAdminLogin";
import AdminDashboard from "../pages/superadmin/Dashboard";
import VerifyServices from "../pages/superadmin/VerifyServices";
import VerifiedServices from "../pages/superadmin/VerifiedServices";
import DeniedServices from "../pages/superadmin/DeniedServices";
import AllSuperAdmin from "../pages/superadmin/AllSuperAdmin";
import ProtectedRoute from "../services/ProtectedRoute";

const SuperAdminRoutes = () => (
  <Routes>
    <Route path="/super-admin/login" element={<SuperAdminAuth />} />
    <Route
      path="/super-admin/dashboard"
      element={
        <ProtectedRoute token="superAdminToken" route="/super-admin/login">
          <AdminDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/verify"
      element={
        <ProtectedRoute token="superAdminToken" route="/super-admin/login">
          <VerifyServices />
        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/verified"
      element={
        <ProtectedRoute token="superAdminToken" route="/super-admin/login">
          <VerifiedServices />
        </ProtectedRoute>
      }
    />
    <Route
      path="/super-admin/denied"
      element={
        <ProtectedRoute token="superAdminToken" route="/super-admin/login">
          <DeniedServices />
        </ProtectedRoute>
      }
    />
    <Route
      path="/all"
      element={
        <ProtectedRoute token="superAdminToken" route="/super-admin/login">
          <AllSuperAdmin />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default SuperAdminRoutes;
