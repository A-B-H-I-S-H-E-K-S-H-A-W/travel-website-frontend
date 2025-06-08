import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import Auth from "./pages/user/Auth";
import Search from "./pages/user/Search";
import InfoPage from "./pages/user/InfoPage";
import BusDashboard from "./pages/admin/bus/Dashboard";
import BusForm from "./pages/admin/bus/BusForm";
import FlightForm from "./pages/admin/flights/FlightForm";
import HotelForm from "./pages/admin/hotels/HotelForm";
import HotelDashboard from "./pages/admin/hotels/Dashboard";
import AdminDashboard from "./pages/superadmin/Dashboard";
import Checkout from "./pages/user/Checkout";
import { UserAuthProvider } from "./context/UserAuthContext";
import AccountSettings from "./pages/user/AccountSettings";
import ProtectedRoute from "./services/ProtectedRoute";
import Saved from "./pages/user/Saved";
import RecentTrips from "./pages/user/RecentTrips";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import AdminAuth from "./pages/admin/AdminLogin";
import FlightDashboard from "./pages/admin/flights/Dashboard";
import RoomCreate from "./pages/admin/hotels/RoomCreate";
import RoomList from "./pages/admin/hotels/RoomList";
import ProfileSettings from "./pages/admin/ProfileSettings";
import SuperAdminAuth from "./pages/superadmin/SuperAdminLogin";
import { SuperAdminProvider } from "./context/SuperAdminContext";
import VerifyServices from "./pages/superadmin/VerifyServices";
import VerifiedServices from "./pages/superadmin/VerifiedServices";
import DeniedServices from "./pages/superadmin/DeniedServices";
import AllSuperAdmin from "./pages/superadmin/AllSuperAdmin";

function App() {
  return (
    <>
      <BrowserRouter>
        {/* User */}
        <UserAuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/auth/v1/login"
              element={<Auth isLoginSection={true} />}
            />
            <Route
              path="/auth/v1/register"
              element={<Auth isLoginSection={false} />}
            />
            <Route path="/search" element={<Search />} />
            <Route path="/info" element={<InfoPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="/settings"
              element={
                <ProtectedRoute token={"userToken"} route={"/"}>
                  <AccountSettings />
                </ProtectedRoute>
              }
            />
            <Route path="/saved" element={<Saved />} />
            <Route path="/recent" element={<RecentTrips />} />
          </Routes>
        </UserAuthProvider>
        {/* User Ends */}
        {/* Admin */}
        <AdminAuthProvider>
          <Routes>
            <Route
              path="/admin/login"
              element={<AdminAuth isLoginSection={true} />}
            />
            <Route
              path="/admin/register"
              element={<AdminAuth isLoginSection={false} />}
            />
            <Route
              path="/hotel/admin/dashboard"
              element={
                <ProtectedRoute token={"adminToken"} route={"/admin/register"}>
                  <HotelDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/hotel/admin/settings" element={<ProfileSettings />} />
            <Route path="/hotel/admin/create" element={<HotelForm />} />
            <Route path="/hotel/admin/room/create" element={<RoomCreate />} />
            <Route path="/hotel/admin/room/list" element={<RoomList />} />
          </Routes>
          <Routes>
            <Route path="/bus/admin/dashboard" element={<BusDashboard />} />
            <Route path="/bus/admin/create" element={<BusForm />} />
          </Routes>
          <Routes>
            <Route
              path="/flight/admin/dashboard"
              element={<FlightDashboard />}
            />
            <Route path="/flight/admin/create" element={<FlightForm />} />
          </Routes>
        </AdminAuthProvider>
        <SuperAdminProvider>
          <Routes>
            <Route path="/super-admin/login" element={<SuperAdminAuth />} />
            <Route
              path="/super-admin/dashboard"
              element={
                <ProtectedRoute
                  token={"superAdminToken"}
                  route={"/super-admin/login"}
                >
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="/super-admin/verify" element={<VerifyServices />} />
            <Route
              path="/super-admin/verified"
              element={<VerifiedServices />}
            />
            <Route path="/super-admin/denied" element={<DeniedServices />} />
            <Route path="/all" element={<AllSuperAdmin />} />
          </Routes>
        </SuperAdminProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
