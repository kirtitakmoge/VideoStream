import React from 'react';

const DepartmentGallery = ({ departments }) => {
  return (
    <div className="grid mx-6 ml-6 grid-cols-3 gap-4 ">
      {departments.map(department => (
        <div
          key={department._id}
          className="bg-gray-200 p-4 rounded-md  cursor-pointer w-30"
          onClick={() => window.location.href = `/department-details/${department.departmentId}`}
        >
          {department.department_name}

        </div>
        
      ))}
    </div>
  );
};

export default DepartmentGallery;
