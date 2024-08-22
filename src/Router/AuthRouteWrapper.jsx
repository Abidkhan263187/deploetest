import { Navigate } from "react-router-dom";
export const AuthRouteWrapper = ({ element }) => {
  const authKey = sessionStorage.getItem("authKey");

  return authKey ? element : <Navigate to="/login" />;
};
