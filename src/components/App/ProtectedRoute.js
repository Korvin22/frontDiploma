import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ loggedIn, children }) => {

  if (!localStorage.loggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;
