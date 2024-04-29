import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LeftNavBar = () => {
  const { user, isLoggedIn } = useAuth();

  const navLinks = useMemo(() => {
    if (!isLoggedIn || !user) {
      // Show login and registration links if user is not logged in
      return (
        <ul>
          <li><Link to="/login/Patient">Patient Login</Link></li>
          <li><Link to="/registration/Patient">Patient Registration</Link></li>
          <li><Link to="/registration/Surgeon">Surgeon Registration</Link></li>
          <li><Link to="/login/Surgeon">Surgeon Login</Link></li>
        </ul>
      );
    } else {
      // User is logged in, show appropriate links based on role
      if (user.role === "Patient") {
        return (
          <ul>
            <li><Link to="/patient">Patient Dashboard</Link></li>
            <li><Link to="/patientvideos">Shared Surgery Videos by Surgeon</Link></li>
          </ul>
        );
      } else if (user.role === "Surgeon" && user.activeBucket && user.activeCamera) {
        return (
          <ul>
            <li><Link to={`/surgeonDashboard/${user.departmentId}`}>Surgeon Dashboard</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
            <li><Link to="/cameralist">Camera</Link></li>
            <li><Link to="/devicelist">Devices</Link></li>
          </ul>
        );
      } else if (user.role === "Hospital Admin" && user.active) {
        return (
          <ul>
            <li><Link to="/hospitalAdmin">Hospital Admin Dashboard</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
            <li><Link to="/createDepartment">Add New Department</Link></li>
          </ul>
        );
      } else if (user.role === "Super Admin") {
        return (
          <ul>
            <li><Link to="/superAdminDashboard">Super Admin Dashboard</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
            <li><Link to="/allHospitals">Hospitals</Link></li>
            <li><Link to="/activateHospitalAdmin">Activate Hospital Admin</Link></li>
          </ul>
        );
      }
    }
  }, [user, isLoggedIn]);

  return (
    <nav>
      {navLinks}
      <ul>
        <li><Link to="/signout">Signout</Link></li>
      </ul>
    </nav>
  );
};

export default LeftNavBar;
