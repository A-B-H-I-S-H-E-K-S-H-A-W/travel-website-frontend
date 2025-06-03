import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, token, route }) => {
  const userToken = localStorage.getItem(token);

  if (!userToken) {
    return <Navigate to={route} replace />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
