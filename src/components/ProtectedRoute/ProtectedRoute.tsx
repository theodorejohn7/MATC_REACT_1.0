import { Navigate, useLocation } from "react-router";
import { useUserLoginContext } from "../../context/UserLoginContext";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  let { isAdmin } = useUserLoginContext();
  let location = useLocation();
  if (!isAdmin) {
    return <Navigate to="/home" />;
  }
  return children;
};
