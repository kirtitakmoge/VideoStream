import React, { useState, useEffect } from "react";
import DepartmentGallery from "./DepartmentGallery";
import DepartmentDetails from "./DepartmentDetails";
import { useParams } from "react-router-dom";
// This component is HospitalAdmin 
const HospitalAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const  adminId  = localStorage.getItem("id");
  const { hospitalId } = useParams();
  const [HospitalName, setHospitalName] = useState("");
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        alert(hospitalId);
        const token=localStorage.getItem("token");
        console.log(adminId); 
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospitalId/${hospitalId}/${adminId }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          },
          }
        );
        if (response.ok) {
          const departmentsData = await response.json();
          console.log(departmentsData.departments);
          setDepartments(departmentsData.departments);
        } else {
          console.error("Error fetching departments:", response.status);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    const fetchHospitalName = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/hospital/getHospitalById//${adminId}/${hospitalId}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setHospitalName(data.Hospital_Name);
        } else {
          console.log("failed to fetch hospital");
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchHospitalName();

    fetchDepartments();
  }, []); // Empty dependency array ensures useEffect runs only once after the initial render

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold mb-4">
        Welcome to {HospitalName}'s Dashboard
      </h1>
      <h1 className="text-2xl font-bold mb-4 ml-6">Department Gallery</h1>
      <DepartmentGallery departments={departments} />
    </div>
  );
};

export default HospitalAdmin;
