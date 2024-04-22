import React from "react";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

const SuperAdminDashboard = () => {
 

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl text-center font-semibold mb-8">
        Super Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
          <Link to="/createsubscriptionPlan">Create New Subscription Plan</Link>
        </div>
        <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md  hover:bg-slate-300">
          <Link to={`/`}>Hospitals</Link>
        </div>
        
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
