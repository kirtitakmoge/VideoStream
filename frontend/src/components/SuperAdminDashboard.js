import React from "react";

import { Link } from "react-router-dom";

import { useAuth } from "./AuthContext";

const SuperAdminDashboard = () => {
 const {user} =useAuth();
if(user)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-semibold mb-8">
        Super Admin {user.firstname} Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
          <Link to="/profileupdate">Profile Update</Link>
        </div>
        <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
          <Link to="/createsubscriptionPlan">Create New Subscription Plan</Link>
        </div>
       
        <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md  hover:bg-slate-300">
          <Link to={`/allHospitals`}>Hospitals</Link>
        </div>

        
        <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md  hover:bg-slate-300">
          <Link to={`/hospitalRegistration`}>Register Hospital</Link>
        </div>
        
        <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md  hover:bg-slate-300">
          <Link to={`/superAllCameras`}>All Registered Cameras</Link>
        </div>
        
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
