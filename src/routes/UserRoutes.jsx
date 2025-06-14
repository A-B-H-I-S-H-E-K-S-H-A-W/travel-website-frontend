// UserRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/user/Home";
import Auth from "../pages/user/Auth";
import Search from "../pages/user/Search";
import InfoPage from "../pages/user/InfoPage";
import Checkout from "../pages/user/Checkout";
import AccountSettings from "../pages/user/AccountSettings";
import Saved from "../pages/user/Saved";
import RecentTrips from "../pages/user/RecentTrips";
import ProtectedRoute from "../services/ProtectedRoute";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/auth/v1/login" element={<Auth isLoginSection={true} />} />
    <Route path="/auth/v1/register" element={<Auth isLoginSection={false} />} />
    <Route path="/search" element={<Search />} />
    <Route path="/info/:id" element={<InfoPage />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route
      path="/settings/:id"
      element={
        <ProtectedRoute token="userToken" route="/">
          <AccountSettings />
        </ProtectedRoute>
      }
    />
    <Route path="/saved" element={<Saved />} />
    <Route path="/recent" element={<RecentTrips />} />
  </Routes>
);

export default UserRoutes;
