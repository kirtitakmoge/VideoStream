// PatientRegistration.js

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const PatientRegistration = () => {
    const navigate=useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    password: "",
    age: "",
    gender: "",
    email: "",
    address: "",
  });

 
  const [departments, setDepartments] = useState([]);
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'hospitalId' && value.length === 24) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospitalId/${value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          
        });
        if (response.ok) {
          const departmentsData = await response.json();
          setDepartments(departmentsData.departments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }
  };

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("Patient registered successfully!");
        navigate("/patient");
      } else {
        const errorData = await response.json();
        toast.error(errorData.error);
      }
    } catch (error) {
      console.error("An error occurred during registration:", error.message);
    }
  };

  return (
    <div className="max-w-md mt-0 mx-auto p-6 bg-white shadow-l rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Patient Registration</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block font-medium">First Name:</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block font-medium">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block font-medium">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block font-medium">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
            <label htmlFor="hospitalId" className="block font-medium">Hospital ID</label>
            <input type="text" id="hospitalId" name="hospitalId" value={formData.hospitalId} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
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
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Register</button>
      </form>
    </div>
  );
};

export default PatientRegistration;
