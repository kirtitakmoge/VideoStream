import React from "react";
import { HospitalProvider } from "./HospitalContext";
import { useAuth } from "./AuthContext";

const HospitalAccessProvider = ({ children }) => {
  const { user } = useAuth(); // Assuming you have a user object with role information in your auth context

  // Check if the user is a hospital admin or super admin{
  
   //const isHospitalAdminOrSuperAdmin =user && (user.role === "Hospital Admin" || user.role === "Super Admin");

  // Render HospitalProvider only if the user is a hospital admin or super admin}
  return <HospitalProvider>{children}</HospitalProvider> ;
};

export default HospitalAccessProvider;
