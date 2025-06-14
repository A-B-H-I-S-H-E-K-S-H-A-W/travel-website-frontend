// AdminRoutes.jsx
import { Routes, Route } from "react-router-dom";
import AdminAuth from "../pages/admin/AdminLogin";
import HotelDashboard from "../pages/admin/hotels/Dashboard";
import HotelForm from "../pages/admin/hotels/HotelForm";
import HotelsList from "../pages/admin/hotels/HotelsList";
import EditHotelForm from "../pages/admin/hotels/HotelEdit";
import RoomCreate from "../pages/admin/hotels/RoomCreate";
import RoomList from "../pages/admin/hotels/RoomList";
import RoomEdit from "../pages/admin/hotels/RoomEdit";
import BusDashboard from "../pages/admin/bus/Dashboard";
import BusForm from "../pages/admin/bus/BusForm";
import BusList from "../pages/admin/bus/BusList";
import EditBusPage from "../pages/admin/bus/BusEdit";
import FlightDashboard from "../pages/admin/flights/Dashboard";
import FlightForm from "../pages/admin/flights/FlightCreate";
import FlightList from "../pages/admin/flights/FlightList";
import FlightEdit from "../pages/admin/flights/FlightEdit";
import ProfileSettings from "../pages/admin/ProfileSettings";
import ProtectedRoute from "../services/ProtectedRoute";

const AdminRoutes = () => (
  <Routes>
    <Route path="/admin/login" element={<AdminAuth isLoginSection={true} />} />
    <Route
      path="/admin/register"
      element={<AdminAuth isLoginSection={false} />}
    />

    {/* Hotel */}
    <Route
      path="/hotel/admin/dashboard"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <HotelDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel/admin/settings"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <ProfileSettings />
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel/admin/create"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <HotelForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel/admin/list"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <HotelsList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel/admin/edit/:id"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <EditHotelForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel/admin/room/create"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <RoomCreate />
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel/admin/room/list"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <RoomList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/hotel/admin/room/edit/:id"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <RoomEdit />
        </ProtectedRoute>
      }
    />

    {/* Bus */}
    <Route
      path="/bus/admin/dashboard"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <BusDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/bus/admin/create"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <BusForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/bus/admin/list"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <BusList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/bus/admin/edit/:id"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <EditBusPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/bus/admin/settings"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <ProfileSettings />
        </ProtectedRoute>
      }
    />

    {/* Flight */}
    <Route
      path="/flight/admin/dashboard"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <FlightDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/flight/admin/create"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <FlightForm />
        </ProtectedRoute>
      }
    />
    <Route
      path="/flight/admin/list"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <FlightList />
        </ProtectedRoute>
      }
    />
    <Route
      path="/flight/admin/edit/:id"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <FlightEdit />
        </ProtectedRoute>
      }
    />
    <Route
      path="/flight/admin/settings"
      element={
        <ProtectedRoute token="adminToken" route="/admin/register">
          <ProfileSettings />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AdminRoutes;
