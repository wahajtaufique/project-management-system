import { Navigate } from "react-router-dom";

const Authmiddleware = ({ children, isAuthProtected }) => {
  
  const user = localStorage.getItem("authUser");
  
  if (!user && isAuthProtected) {
    return <Navigate to="/login" />;
  }
  return children;

};

export default Authmiddleware;