import React from "react";
import { Link } from "react-router-dom";

const DepartmentGallery = ({ departments ,hospitalId,hospital_name}) => {
  return (
    <div className="mx-6 items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-gray-200 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
          <Link
            to={`/profileUpdate`}
          
           
          >
            <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">Profile Update</h2>
          </Link>
        </div>
        <div className="bg-gray-200 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
          <Link
            to={`/createDepartment/${hospitalId}`}
           
          >
           <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">Add New Department</h2>
          </Link>
        </div>
         <div className="bg-gray-200 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
          <Link
            to={`/patientDataByHospital/${hospitalId}`}
          
           
          >
            <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">Patient</h2>
          </Link>
        </div>
        <div className="bg-gray-200 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
          <Link
            to={`/AllSurgeonByHospital/${hospitalId}`}
          
           
          >
            <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">All Surgeon</h2>
          </Link>
        </div>
       
      
        {departments.map((department) => (
           <div  key={department._id} className="bg-gray-200 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
            <Link
              to={ `/department-details/${department._id}/${department.department_name}`
                // Pass updateDepartments function as state
              }
            
            
            >
              <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">{department.department_name}</h2>
            </Link>
          </div>
        ))}
      </div>
      
     
     
    </div>
  );
};

export default DepartmentGallery;
