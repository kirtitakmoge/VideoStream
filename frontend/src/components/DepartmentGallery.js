import React from "react";
import { Link } from "react-router-dom";
const DepartmentGallery = ({ departments }) => {
  return (
    <>
      <div className="grid mx-6 ml-6 grid-cols-3 gap-4 ">
        {departments.map((department) => (
          <div className="col-span-1 shadow-md">
            <Link
              to={`/department-details/${department.departmentId}`}
              className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">
                {""}
                {department.department_name}
                
              </h2>
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
      </div>
    </>
  );
};

export default DepartmentGallery;
