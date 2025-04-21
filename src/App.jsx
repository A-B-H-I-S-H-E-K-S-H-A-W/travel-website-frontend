import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/user/Home";
import Auth from "./pages/user/Auth";
import Search from "./pages/user/Search";
import InfoPage from "./pages/user/InfoPage";
import BusDashboard from "./pages/admin/bus/Layout";
import FlightDashboard from "./pages/admin/flights/Layout";
import BusForm from "./pages/admin/bus/BusForm";
import FlightForm from "./pages/admin/flights/FlightForm";
import HotelForm from "./pages/admin/hotels/HotelForm";
import HotelDashboard from "./pages/admin/hotels/Dashboard";
import AdminDashboard from "./pages/superadmin/Dashboard";
import Checkout from "./pages/user/Checkout";

function App() {
  return (
    <>
      <BrowserRouter>
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
          {/* Admin Dashboard */}
          {/* BusDashboard */}
          <Route path="/bus/admin/dashboard" element={<BusDashboard />} />
          <Route path="/bus/admin/create" element={<BusForm />} />
          {/* FlightDashboard */}
          <Route path="/flight/admin/dashboard" element={<FlightDashboard />} />
          <Route path="/flight/admin/create" element={<FlightForm />} />
          {/* HotelDashboard */}
          <Route path="/hotel/admin/dashboard" element={<HotelDashboard />} />
          <Route path="/hotel/admin/create" element={<HotelForm />} />
          {/* SuperAdmin */}
          <Route path="/super-admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
