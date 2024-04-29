// DepartmentContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const DepartmentContext = createContext();

// Custom hook to use the department context
export const useDepartment = () => useContext(DepartmentContext);

// Provider component to wrap your app and provide the department context
export const DepartmentProvider = ({ children }) => {
  const [departments, setDepartments] = useState([]);

  // Function to fetch departments
  const fetchDepartments = async (hospitalId,adminId,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospitalId/${hospitalId}/${adminId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` // Include the token in the Authorization header
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

  // Function to create a department
  const createDepartment = async (departmentData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/departments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(departmentData),
      });
      if (response.ok) {
        const createdDepartment = await response.json();
        setDepartments([...departments, createdDepartment]);
        return createdDepartment;
      } else {
        console.error('Failed to create department');
        return null;
      }
    } catch (error) {
      console.error('Error creating department:', error);
      return null;
    }
  };

  // Function to update a department
  const updateDepartment = async (departmentId,adminId,departmentData,token) => {
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
                department_name: departmentData,
             
              }),
            }
          );
      if (response.ok) {
        const updatedDepartment = await response.json();
        const updatedDepartments = departments.map(department =>
          department._id === departmentId ? updatedDepartment : department
        );
        setDepartments(updatedDepartments);
        return updatedDepartment;
      } else {
        console.error('Failed to update department');
        return null;
      }
    } catch (error) {
      console.error('Error updating department:', error);
      return null;
    }
  };

  // Function to delete a department
  const deleteDepartmentById = async (departmentId,adminId,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/deleteDepartmentById/${departmentId}/${adminId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
      });
      if (response.ok) {
        setDepartments(departments.filter(department => department._id !== departmentId));
        console.log('Department deleted successfully');
        return true;
      } else {
        console.error('Failed to delete department');
        return false;
      }
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  // Context value
  const value = {
    departments,
    fetchDepartments,
    createDepartment,
    updateDepartment,
    deleteDepartmentById,
  };

  return (
    <DepartmentContext.Provider value={value}>
      {children}
    </DepartmentContext.Provider>
  );
};
