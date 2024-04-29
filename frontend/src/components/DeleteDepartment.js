import React, { useState,useEffect } from 'react';
import { toast } from 'react-hot-toast';

import{useParams} from "react-router-dom"
//Hospital Admin can delete the departments
//delete department for hospital of hospital Admin 

const DeleteDepartment = () => {
    const { departmentId} = useParams();
   const[department_name,setDepartment_name]=useState();
  const adminId = localStorage.getItem('id');
  const token = localStorage.getItem('token');
  useEffect(() => {
    // Fetch the old department name based on the departmentId
    const fetchDepartmentName = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/department/getDepartmentById/${departmentId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
         setDepartment_name(data.department_name);
        } else {
          throw new Error('Failed to fetch department details');
        }
      } catch (error) {
        console.error('Error fetching department details:', error.message);
        toast.error(`Error fetching department details: ${error.message}`, {
          duration: 2000,
          position: 'top-center',
        });
      }
    };

    fetchDepartmentName();
  }, [departmentId, token]);
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/department/deleteDepartmentById/${departmentId}/${adminId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        toast.success(`${department_name} Department deleted successfully`, {
          duration: 2000,
          position: 'top-center',
        });
        
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
        toast.error(`Error deleting department: ${errorMessage}`, {
          duration: 2000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error deleting department:', error.message);
      toast.error(`Error deleting department: ${error.message}`, {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-lg">
        <p className="text-center">Are you sure you want to delete this department?</p>
        <p className="text-xl font-bold text-center">{department_name}</p>
        <div className="flex justify-center mt-4">
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete Department
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteDepartment;
