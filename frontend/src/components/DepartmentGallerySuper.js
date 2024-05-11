import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom"
import { useDepartment } from './DepartmentContext';
import { useParams } from "react-router-dom";
const DepartmentGallerySuper = () => {
    const [departments,setDepartments]=useState([]);
    const {fetchDepartments}=useDepartment();
const {hospitalId,hospital_name}=useParams();

const superAdminId=localStorage.getItem("id");
const token=localStorage.getItem("token");
     useEffect(() => {
    const fetchDepartmentsData = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospitalId/${hospitalId}`, {
              method: "GET",
              headers: {
                  "Content-Type": "application/json",
                   Authorization: `Bearer ${token}` // Include the token in the Authorization header
              },
            });
            if (response.ok) {
              const data = await response.json();
              setDepartments(data.departments);
              return data;
            } else {
              console.error('Failed to fetch departments');
            }

          } catch (error) {
            console.error('Error fetching departments:', error);
          }
    };
  
    fetchDepartmentsData();
  }, [hospitalId]);
  return (
    <>
     <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-center mb-5">{hospital_name}</h1>
            <h1 className="text-2xl font-bold text-center mb-5"> Department Gallery</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-6 ml-6">
                {departments.map((department) => (
                    <div key={department.departmentId} className="shadow-md">
                        <Link
                            to={{
                                pathname: `/departmentDetailSuper/${department.departmentId}/${department.department_name}`,
                                // Pass updateDepartments function as state
                            }}
                            className="block bg-gray-100 w-full p-4 rounded-md hover:bg-gray-200"
                        >
                            <h2 className="text-xl  font-bold mb-2">{department.department_name}</h2>
                        </Link>
                    </div>
                ))}
                <div className="shadow-md">
                    <Link to={`/activateHospitalAdmin/${hospitalId}`} className="block bg-gray-100 p-4 rounded-md hover:bg-gray-200">
                        <h2 className="text-xl font-bold mb-2">Activate Hospital Admin</h2>
                    </Link>
                </div>
            </div>
        </div>
    </>
  );
};

export default DepartmentGallerySuper;
