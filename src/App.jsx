// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import { UserAuthProvider } from "./context/UserAuthContext";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import { SuperAdminProvider } from "./context/SuperAdminContext";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/*"
          element={
            <UserAuthProvider>
              <UserRoutes />
            </UserAuthProvider>
          }
        />

        <Route
          path="/admin/*"
          element={
            <AdminAuthProvider>
              <AdminRoutes />
            </AdminAuthProvider>
          }
        />

        <Route
          path="/super-admin/*"
          element={
            <SuperAdminProvider>
              <SuperAdminRoutes />
            </SuperAdminProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
