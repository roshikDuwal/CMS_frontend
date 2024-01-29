import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Auth } from "./auth";

const ProtectedRoute = ({ children }:{children:any}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = Auth();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [isAuthenticated]);
  
  return <>{children}</>;
};

export default ProtectedRoute;
