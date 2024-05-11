import { useEffect } from "react";
import React from "react";
import { useHospitalContext } from "./HospitalContext";

import { Link } from "react-router-dom";

const AllHospitals = () => {
 
  const { hospitals, fetchHospitals } = useHospitalContext();
 const superAdminId=localStorage.getItem("id");
 const token=localStorage.getItem("token");
  useEffect(() => {
    fetchHospitals(superAdminId,token);
  },[]);


  return (
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl mt-6 font-bold text-center">Hospitals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          {hospitals.map((hospital) => (
            <div key={hospital._id}>
              <Link
                to={`/departmentGallerySuper/${hospital._id}/${hospital.Hospital_Name}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:bg-gray-100 transition-colors duration-300"
              >
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-2">{hospital.Hospital_Name}</h2>
                  {/* You can add more information here if needed */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default AllHospitals;
