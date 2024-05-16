import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {useParams} from "react-router-dom";
//only hospital Admin can Rename Department from his Hospital only 
//need to send admin id to verify he is hospital admin
const RenameDepartment = () => {
    const {departmentId}=useParams();
  const [formData, setFormData] = useState({
    department_name: '',
    old_name: '',
  });

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
          setFormData({
            ...formData,
            department_name: data.department_name,
            old_name: data.department_name,
          });
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
  }, [departmentId, token]); // Fetch department details when departmentId or token changes

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/department/updateDepartmentById/${departmentId}/${adminId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            department_name: formData.department_name,
         
          }),
        }
      );

      if (response.ok) {
        toast.success(`Department renamed successfully`, {
          duration: 2000,
          position: 'top-center',
        });
         // Close the form after successful rename
      } else {
        const errorMessage = await response.text();
        console.error(errorMessage);
        toast.error(`Error renaming department: ${errorMessage}`, {
          duration: 2000,
          position: 'top-center',
        });
      }
    } catch (error) {
      console.error('Error renaming department:', error.message);
      toast.error(`Error renaming department: ${error.message}`, {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="max-w-md mx-auto mt-2 pt-0 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Rename Department</h2>
        <p className="text-center text-gray-600 mb-4">Old Name: {formData.old_name}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="department_name" className="block mb-4 font-medium">
             Rename File
            </label>
            <input
              type="text"
              id="department_name"
              name="department_name"
              value={formData.department_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2 hover:bg-blue-600"
          >
            Rename Department
          </button>
        </form>
      </div>
    </div>
  );
};

export default RenameDepartment;
