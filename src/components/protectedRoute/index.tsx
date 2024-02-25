import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const cookie = cookies.get("Authorization");
  if (cookie === undefined) {
    return <Navigate to="/login" />;
  }
  return element;
};

export default ProtectedRoute;
