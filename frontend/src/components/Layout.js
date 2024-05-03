import React from "react";
import { useNavigate, useLocation, UNSAFE_NavigationContext } from 'react-router-dom';
import { FaArrowLeft, FaHome } from "react-icons/fa";
import { useAuth } from "./AuthContext";
const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
   const{user} =useAuth();
    const handleGoBack = () => {
      navigate(-1);
    };
   const handleGoHome=()=>
   { alert(user.role);
     if(user.role=="Patient")
    navigate("/patient");
    else if(user.role=="Surgeon")
    navigate(`/surgeonDashboard/${user.departmentId}`);
  else if(user.role=="Hospital Admin")
  navigate("/hospitalAdmin");
else if(user.role=="Super Admin")
navigate("/superAdminDashboard" );

   }
    // Check if the current pathname starts with '/login' or '/registration'
    const isRestrictedRoute = location.pathname.startsWith('/login') || location.pathname.startsWith("/registration")||location.pathname.endsWith("/");
  
    return (
      <div className="container">
        {!isRestrictedRoute && (
          <div className="relative mt-0 ml-0 flex flex-row justify-between items-center">
            <button onClick={handleGoBack} className="text-black px-4 rounded">
              <FaArrowLeft className="text-red-500 cursor-pointer text-3xl font-bold" />
            </button>
            <button onClick={handleGoHome} className="text-black px-4 rounded">
              <FaHome className="text-red-500 cursor-pointer text-3xl font-bold" />
            </button>
          </div>
        )}
        <div>
          {children}
        </div>
      </div>
    );
};

export default Layout;
