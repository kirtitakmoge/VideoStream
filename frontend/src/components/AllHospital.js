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
    <>
      <div>
        <h2 className="text-2xl mt-6 font-bold text-center">Hospitals</h2>
        <div className="grid m-6  grid-cols-3 gap-4 ">
          {hospitals.map((hospital) => (
            <div className="col-span-1 shadow-md" key={hospital._id}>
              <Link
                to={`/departmentGallerySuper/${hospital._id}/${hospital.Hospital_Name}`}
                className="bg-gray-100 h-full block p-4 rounded-md hover:bg-gray-200"
              >
                <h2 className="text-2xl font-bold mb-4">{hospital.Hospital_Name}</h2>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllHospitals;
