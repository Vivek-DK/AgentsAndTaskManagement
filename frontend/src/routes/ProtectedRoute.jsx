import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {

  // get auth data from local storage
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // if no token → redirect to login
  if (!token) return <Navigate to="/login" />;

  // if role restriction exists and doesn't match → redirect home
  if (role && role !== userRole)
    return <Navigate to="/" />;

  // allow access to protected content
  return children;
}
