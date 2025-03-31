import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AppContext";

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  // Ensure user exists and has the role of "admin"
  const isAdmin = user && user.role === "admin";

  return isAdmin ? <Outlet /> : <Navigate to="/admin/login" replace />;
};

export default AdminRoute;
