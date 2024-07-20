import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";

const LeftNavBar = () => {
  const { user, isLoggedIn } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = useMemo(() => {
    if (!isLoggedIn || !user) {
      return (
        <ul>
          <li><Link to="/login/Patient">Patient Login</Link></li>
          <li><Link to="/registration/Patient">Patient Registration</Link></li>
          <li><Link to="/registration/Surgeon">Surgeon Registration</Link></li>
          <li><Link to="/login/Surgeon">Surgeon Login</Link></li>
        </ul>
      );
    } else {
      if (user.role === "Patient") {
        return (
          <ul>
            <li><Link to="/patient">Patient Dashboard</Link></li>
            <li><Link to="/patientvideos">Shared Surgery Videos by Surgeon</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      } else if (user.role === "Surgeon" && user.bucketActive && user.cameraActive) {
        return (
          <ul>
            <li><Link to={`/surgeonDashboard/${user.departmentId}`}>Surgeon Dashboard</Link></li>
            <li><Link to="/cameralist">Camera</Link></li>
            <li><Link to="/devicelist">Devices</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      } else if (user.role === "Hospital Admin" && user.active) {
        return (
          <ul>
            <li><Link to="/hospitalAdmin">Hospital Admin Dashboard</Link></li>
            <li><Link to="/createDepartment">Add New Department</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      } else if (user.role === "Super Admin") {
        return (
          <ul>
            <li><Link to="/superAdminDashboard">Super Admin Dashboard</Link></li>
            <li><Link to="/allHospitals">Hospitals</Link></li>
            <li><Link to="/hospitalRegistration">Register Hospital</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      }
    }
  }, [user, isLoggedIn]);

  return (
    <div className="lg:flex lg:flex-row lg:min-h-screen">
      {/* Mobile sidebar toggle button */}
      <div className={`fixed top-0 left-0 z-50 ${isSidebarOpen ? "block" : "hidden"} lg:hidden`}>
        <button
          className="text-white p-4"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Sidebar navigation */}
      <nav className={`bg-gray-800 text-white w-64 min-h-screen fixed left-0 top-0 overflow-y-auto transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:flex lg:flex-col lg:justify-between lg:shadow-lg`}>
        {/* Branding/logo */}
        <div className="p-4 flex items-center justify-between">
          <img
            src="https://th.bing.com/th?id=OIP.jLXDXo17XAjxbpkevv2kBAHaGV&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Taurean Surgical Logo"
            className="w-12 h-12 mr-2"
          />
          <p className="text-lg font-semibold">Taurean Surgical</p>
        </div>

        {/* Navigation links */}
        <div className="overflow-y-auto">
          {navLinks}

          {/* Logout link */}
          {isLoggedIn && (
            <ul>
              <li><Link to="/signout">Sign Out</Link></li>
            </ul>
          )}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-grow p-4">
        {/* Main content goes here */}
      </main>
    </div>
  );
};

export default LeftNavBar;
