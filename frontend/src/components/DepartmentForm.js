import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
const DepartmentForm = () => {
  const [formData, setFormData] = useState({
    department_name: '',
    hospitalId: '',
  });
  const [hospitals, setHospitals] = useState([]);
  const adminId=localStorage.getItem("id");
const token=localStorage.getItem("token");
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/getAllHospitals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/createDepartment/${adminId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(`Department created Succesfully`, {
            duration: 2000,
            position: "top-center",
          });
      } else {
        // Handle non-successful responses (status codes other than 2xx)
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating department:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto mt-2 pt-0 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Create Department</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="department_name" className="block font-medium">Department Name</label>
            <input type="text" id="department_name" name="department_name" value={formData.department_name} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label htmlFor="hospitalId" className="block font-medium">Select Hospital</label>
            <select 
              id="hospitalId" 
              name="hospitalId" 
              value={formData.hospitalId} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            >
              <option value="">Select Hospital</option>
              {hospitals.map(hospital => (
                <option key={hospital._id} value={hospital._id}>{hospital.Hospital_Name}</option>
              ))}
            </select>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2 hover:bg-blue-600">Create Department</button>
        </form>
      </div>
    </div>
  );
};

export default DepartmentForm;
