import React, { useEffect, useState } from "react";
import HospitalDepartmentSelector from "./HospitalDepartmentSelector";

import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const GeneralDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleSelection = (hospitalId, departmentId) => {
    if (user.role === "Super Admin") navigate(`/superAdminDashboard`);
    else if (user.role === "Patient") navigate("/patient");
    else if (user.role === "Hospital Admin" && user.active === true)
      navigate(`/hospitalAdmin/${hospitalId}`);
    else if (
      user.role === "Surgeon" &&
      (user.bucketActive === true || user.cameraActive === true)
    ) {
      navigate(`/surgeonDashboard/${departmentId}`);
      // } else if (userType === "Patient") {
      //   navigate("/patient");
    } else {
      navigate(`/notactive/${user.firstname}`);
    }
  };
  useEffect(() => {
    if (user) console.log("General ", user);
  }, [user]);
  return (
    <>{user && <HospitalDepartmentSelector onSelection={handleSelection} />}</>
  );
};
export default GeneralDashboard;
