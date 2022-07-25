import { Navigate } from "react-router";
import { useUserLoginContext } from "../../context/UserLoginContext";

export const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({
  children,
}) => {
  let { isAdmin } = useUserLoginContext();
 
  if (!isAdmin) {
    return <Navigate to="/home" />;
  }
  return children;
};
