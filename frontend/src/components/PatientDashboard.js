import React from 'react';
import { Link } from 'react-router-dom';

const PatientDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className='text-3xl font-bold text-center mb-5'>Patient Dashboard</h1>
      <div className="grid grid-cols-3 gap-8">
       
        <div className="col-span-1 shadow-md">
          <Link to={`/patientprofileupdate`} className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Profile Update</h2>
          </Link>
        </div>
        <Link to="/patientvideos" className="col-span-1 shadow-md">
          <div className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Videos</h2>
          </div>
        </Link>
        <div className="col-span-1 shadow-md">
          <div className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
