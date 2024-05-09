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
    <div>
      <h1 className="text-2xl font-bold text-center mb-5">{hospital_name}</h1>
      <h1 className="text-2xl font-bold text-center mb-5"> Department Gallery</h1>
      <div className="grid mx-6 ml-6 grid-cols-3 gap-4 ">
        {departments.map((department) => (
          <div key={department.departmentId} className="col-span-1 shadow-md">
            <Link
              to={{
                pathname: `/departmentDetailSuper/${department.departmentId}/${department.department_name}`,
               // Pass updateDepartments function as state
              }}
              className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200"
            >
              <h2 className="text-2xl font-bold mb-4">{department.department_name}</h2>
            </Link>
          </div>

          
        ))}
        <div>
          <Link to={`/activateHospitalAdmin/${hospitalId}`} className="bg-gray-100 block p-4 rounded-md hover:bg-gray-200"> <h2 className="text-2xl font-bold mb-4">Activate Hospital Admin</h2></Link>
        </div>
      </div>
      </div>
    </>
  );
};

export default DepartmentGallerySuper;
