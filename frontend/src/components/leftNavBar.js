import React, { useMemo, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const LeftNavBar = () => {
  const { user } = useAuth();

  const navLinks = useMemo(() => {
    
    return (
      <ul>{user==null?(
      <>
          
          <li>
            <Link to="/login/Patient">Patient Login</Link>
          </li>
          <li>
            <Link to="/registration/Patient">Patient Registration</Link>
          </li>
       
          <li>
            <Link to="/registration/Surgeon">Surgeon Registration</Link>
          </li>
        
       
          <li>
            <Link to="/login/Surgeon">Surgeon Login</Link>
          </li>
          <li>
            <Link to="/signout">Logout</Link>
          </li>
          
          </>
      ):(<>
        
        {user.role === "Patient" && (<>
          <li>
            <Link to="/patient">Patient Dashboard</Link>
          </li>
          <li>
             <Link to="/patientvideos">Shared Surgery Videos by Surgeon</Link>
          </li>
          <Link to="/signout">Signout</Link></>
        )}
        {user.role === "Surgeon" && (
          <>
            <li>
              <Link to={`/surgeonDashboard/${user.departmentId}`}>
                Surgeon Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profileupdate">Profile Update</Link>
            </li>
            <li>
              <Link to="/cameralist">Camera</Link>
            </li>
            <li>
              <Link to="/devicelist">Devices</Link>
            </li>
            <li>
          <Link to="/signout">Signout</Link>
        </li>
          </>
        )}
        {user.role === "Hospital Admin" && (
          <>
            <li>
              <Link to="/hospitalAdmin">Hospital Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/profileupdate">Profile Update</Link>
            </li>
            <li>
              <Link to="/createDepartment">Create Department</Link>
            </li>
            <li>
          <Link to="/signout">Signout</Link>
        </li>
          </>
        )}

{user.role === "Super Admin" && (
          <>
            <li>
              <Link to="/superAdminDashboard">Super Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/profileupdate">Profile Update</Link>
            </li>
            <li>
              <Link to="/allHospitals">Hospitals</Link>
            </li>
            <li>
            <Link to="/allHospitals">Activate Hospital Admin</Link>
            </li>
            <li>
          <Link to="/signout">Signout</Link>
        </li>
          </>
        )}
      </> ) }
      </ul>
    );
  }, [user]);

  return <nav>{navLinks}</nav>;
};

export default LeftNavBar;
