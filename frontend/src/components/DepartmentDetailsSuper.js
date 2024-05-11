import React from "react";
import {Link,useParams} from "react-router-dom";

const DepartmentDetailsSuper=()=>
    {
        const {departmentId,department_name}=useParams();
        return(<>
    
    <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-center mb-10">{department_name} Department</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                <div className="shadow-md">
                    <Link to={`/surgeonListOnly/${departmentId}`} className="button h-full bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
                        <h2 className="text-2xl text-center font-bold mb-4">Surgeons</h2>
                    </Link>
                </div>
                <div className="shadow-md">
                    <Link to={`/cameraList/${departmentId}`} className="button bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
                        <h2 className="text-2xl text-center font-bold mb-4">Live stream from camera</h2>
                    </Link>
                </div>
                <div className="shadow-md">
                    <Link to={`/devicelist/${departmentId}`} className="button bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
                        <h2 className="text-2xl text-center font-bold mb-4">Recorded Video from camera</h2>
                    </Link>
                </div>
                <div className="shadow-md">
                    <Link to={`/patientData/${departmentId}`} className="button h-full bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
                        <h2 className="text-2xl text-center font-bold mb-4">Patients</h2>
                    </Link>
                </div>
                <div className="shadow-md">
                    <Link to={`/createCamera/${departmentId}/${department_name}`} className="button bg-gray-100 p-4 rounded-md block hover:bg-gray-200">
                        <h2 className="text-2xl text-center font-bold mb-4">Register Camera</h2>
                    </Link>
                </div>
            </div>
        </div>
        </>)
    }
    export default DepartmentDetailsSuper;