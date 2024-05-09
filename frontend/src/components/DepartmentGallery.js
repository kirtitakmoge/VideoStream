import React from "react";
import { Link } from "react-router-dom";

const DepartmentGallery = ({ departments}) => {
  return (
    <>
      <div className="grid mx-6 ml-6 grid-cols-3 gap-4 ">
        {departments.map((department) => (
          <div key={department.departmentId} className="col-span-1 shadow-md">
            <Link
              to={{
                pathname: `/department-details/${department.departmentId}/${department.department_name}`,
               // Pass updateDepartments function as state
              }}
              className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">{department.department_name}</h2>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="grid m-6 ml-6 grid-cols-3 gap-4 ">
        <div className=" col-span-1 shadow-md">
          <Link
            to={`/createDepartment/`}
            className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200"
          >
            <h2 className="text-2xl font-bold mb-4">Add New Department</h2>
          </Link>

        </div>
        <div className=" col-span-1 shadow-md">
          <Link
            to={`/patientData`}
            className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200"
          >
            <h2 className="text-2xl font-bold mb-4">Patient</h2>
          </Link>
          
        </div>
      </div>
    </>
  );
};

export default DepartmentGallery;
