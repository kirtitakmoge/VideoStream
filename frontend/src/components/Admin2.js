import React, { useState, useEffect } from "react";
import DepartmentGallery from "./DepartmentGallery";

import { useAuth } from './AuthContext';

import { useHospitalContext } from "./HospitalContext";
import { useDepartment } from './DepartmentContext';
const HospitalAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const adminId = localStorage.getItem("id");
  const {fetchDepartments}=useDepartment();
  const [hospitalName, setHospitalName] = useState("");
  const token = localStorage.getItem("token");
  const { user } = useAuth(); 
  const { getHospitalById }  = useHospitalContext();
  useEffect(() => {
    const fetchDepartmentsData = async () => {
      try {
        const data = await fetchDepartments(user.hospitalId,adminId, token); // Call fetchDepartments
        if (data != null) {
          setDepartments(data.departments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
  
    fetchDepartmentsData();
  }, [user.hospitalId, token, fetchDepartments]);

  useEffect(() => {
    const fetchHospitalName = async () => {
      try {
        // Call getHospitalById function with adminId, user.hospitalId, and token from hospital Context
        const data = await getHospitalById(adminId, user.hospitalId, token);
        // Set hospitalName state with response data
        if(data!=null)
        setHospitalName(data.Hospital_Name);
      } catch (error) {
        console.error(error);
      }
    };
  
    fetchHospitalName();
  }, [adminId, user.hospitalId, token, getHospitalById]);
  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold mb-4">
        Welcome to {hospitalName}'s Dashboard
        
      </h1>
      <h2 className="text-center text-2xl font-bold mb-4"> Hospital Admin : {user.firstname}</h2>
      <h1 className="text-2xl text-center font-bold mb-4 ml-6">Department Gallery</h1>
      {/* Pass departments and updateDepartments as props to DepartmentGallery */}
      <DepartmentGallery departments={departments} />
    </div>
  );
};

export default HospitalAdmin;
