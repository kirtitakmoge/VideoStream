// DepartmentDetails.js

import React from "react";
import { Link ,useParams} from "react-router-dom";

const DepartmentDetails = () => {
  const { departmentId,department_name } = useParams();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-10"> {department_name} Department</h1>
      <div className="grid grid-cols-3 gap-8 ">
      
        <div className="col-span-1  shadow-md ">
          <Link to={`/surgeonList/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Surgeons</h2>
            
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/showvideo/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Live Streaming from Camera</h2>
            
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/deviceListadmin/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Recorded Video from camera</h2>
            
          </Link>
        </div>
        <div className="col-span-1 shadow-md">
          <Link to={`/createCamera/${departmentId}`} className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Add new Camera</h2>
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/renameDepartment/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Rename Department</h2>
            
          </Link>
        </div>
        <div className="col-span-1  shadow-md ">
          <Link to={`/deleteDepartment/${departmentId}`} className="bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
            <h2 className="text-2xl font-bold mb-4">Delete Department</h2>
            
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;
