import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token }) => {
  const userToken = localStorage.getItem(token);

  if (!userToken) {
    return <Navigate to="/" replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
