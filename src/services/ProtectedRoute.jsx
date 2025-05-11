import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const userToken = localStorage.getItem("userToken");

  if (!userToken) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
