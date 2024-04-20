// RegistrationForm.js

import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const reset = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    hospitalId: '',
    mobile_no: '',
    departmentId: '', // New state for department
  };
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]); // State for departments
  const [formData, setFormData] = useState(reset);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/getAllHospitals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setHospitals(userData);
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };
    fetchHospitals();
  }, []);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'hospitalId') {
      try {
        console.log("fetching department");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospitalId/${value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
        });
        if (response.ok) {
          const departmentsData = await response.json();
          console.log(departmentsData.departments);
          setDepartments(departmentsData.departments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token=localStorage.getItem("item");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if(response.ok) {
        const userData = await response.json();
        localStorage.setItem("username", userData.user.firstname);
        localStorage.setItem("id", userData.user._id);
        localStorage.setItem("token", userData.token);
        toast.success(` Welcome  ${userData.user.firstname}`, {
          duration: 2000,
          position: "top-center",
        });
        if(userData.user.active==false)
        navigate(`/notactive/${userData.user.firstname}`);
        setFormData(reset);

      } else {
        const errorMessage = await response.text();
        console.log(errorMessage)
        toast.error(`Registration Failed ${errorMessage}`, {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error(`Registration Failed`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mt-0 mx-auto">
      <div className="max-w-md mx-auto  p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">User Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block font-medium">First Name</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block font-medium">Last Name</label>
            <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <div className="mb-4">
            <label htmlFor="hospitalId" className="block font-medium">Hospital</label>
            <select id="hospitalId" name="hospitalId" value={formData.hospitalId} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
              <option value="">Select Hospital</option>
              {hospitals.map(hospital => (
                <option key={hospital._id} value={hospital._id}>{hospital.Hospital_Name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="departmentId" className="block font-medium">Department</label>
            <select id="departmentId" name="departmentId" value={formData.departmentId} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500">
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department._id} value={department._id}>{department.department_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="mobile_no" className="block font-medium">Mobile Number</label>
            <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
