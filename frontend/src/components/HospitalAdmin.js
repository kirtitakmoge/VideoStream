import React, { useState, useEffect } from "react";
import DepartmentGallery from "./DepartmentGallery";

import { useAuth } from './AuthContext';
import { useHospitalContext } from "./HospitalContext";
import { useDepartment } from './DepartmentContext';

const HospitalAdmin = () => {
  const [departments, setDepartments] = useState([]);
  const [hospitalName, setHospitalName] = useState("");
  const { user } = useAuth(); 
  const { fetchDepartments } = useDepartment();
  const { getHospitalById } = useHospitalContext();

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        try {
          const adminId = localStorage.getItem("id");
          const token = localStorage.getItem("token");
          const data = await fetchDepartments(user.hospitalId, adminId, token);
          if (data) {
            setDepartments(data.departments);
          }
        } catch (error) {
          console.error('Error fetching departments:', error);
        }
      };

      fetchData();
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      const fetchHospitalName = async () => {
        try {
          const adminId = localStorage.getItem("id");
          const token = localStorage.getItem("token");
          const data = await getHospitalById(adminId, user.hospitalId, token);
          if (data) {
            setHospitalName(data.Hospital_Name);
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchHospitalName();
    }
  }, [user]);
  

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center text-2xl font-bold mb-4">
        Welcome to {hospitalName ? `${hospitalName}'s` : 'the Hospital'} Dashboard
      </h1>
      <h2 className="text-center text-2xl font-bold mb-4"> Hospital Admin : {user ? user.firstname : 'Loading...'}</h2>
      <h1 className="text-2xl text-center font-bold mb-4 ml-6">Department Gallery</h1>
      <DepartmentGallery departments={departments} />
    </div>
  );
};

export default HospitalAdmin;
