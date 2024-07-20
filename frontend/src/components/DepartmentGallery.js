import React from "react";
import { Link } from "react-router-dom";

const DepartmentGallery = ({ departments }) => {
  return (
    <div className="mx-6 items-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {departments.map((department) => (
          <div key={department._id} className="shadow-md">
            <Link
              to={ `/department-details/${department._id}`
                // Pass updateDepartments function as state
              }
              className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200 h-full flex flex-col justify-center"
              style={{ minHeight: "100px" }} // Adjust the minHeight as needed
            >
              <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">{department.department_name}</h2>
            </Link>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="shadow-md">
          <Link
            to={`/createDepartment/`}
            className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200 h-full flex flex-col justify-center"
            style={{ minHeight: "120px" }} // Adjust the minHeight as needed
          >
            <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">Add New Department</h2>
          </Link>
        </div>
        <div className="shadow-md">
          <Link
            to={`/patientData`}
            className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200 h-full flex flex-col justify-center"
            style={{ minHeight: "120px" }} // Adjust the minHeight as needed
          >
            <h2 className="text-1xl md:text-1xl lg:text-2xl text-center font-bold">Patient</h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentGallery;
