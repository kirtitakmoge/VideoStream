import React, { useState, useEffect } from 'react';

const CameraForm = () => {
  const [formData, setFormData] = useState({
    Specialization: '',
    ipAddress: '',
    deviceId: '',
    streamKey: '',
    departmentId: '',
    link: ''
  });
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments when component mounts
    const fetchDepartments = async () => {
      
    const id="66011c5292537b3a5e1855c3";
      try {
        console.log("fetching department");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospitalId/${id}`, {
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
      }
      catch (error) {
        console.error('Error fetching departments:', error);
      }
    }
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/camera/createCamera`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Camera created successfully
        // You can handle success however you want
        console.log("Camera created successfully!");
      } else {
        // Handle non-successful responses (status codes other than 2xx)
        const errorMessage = await response.text();
        console.error(errorMessage);
      }
    } catch (error) {
      console.error('Error creating camera:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto mt-2 pt-0 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Create Camera</h2>
        <form onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <label htmlFor="ipAddress" className="block font-medium">IP Address</label>
            <input type="text" id="ipAddress" name="ipAddress" value={formData.ipAddress} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label htmlFor="deviceId" className="block font-medium">Device ID</label>
            <input type="text" id="deviceId" name="deviceId" value={formData.deviceId} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label htmlFor="streamKey" className="block font-medium">Stream Key</label>
            <input type="text" id="streamKey" name="streamKey" value={formData.streamKey} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </div>
          <div className="mb-4">
            <label htmlFor="departmentId" className="block font-medium">Select Department</label>
            <select 
              id="departmentId" 
              name="departmentId" 
              value={formData.departmentId} 
              onChange={handleChange} 
              className="w-full border border-gray-300 rounded px-2 py-1"
              required
            >
              <option value="">Select Department</option>
              {departments.map(department => (
                <option key={department._id} value={department._id}>{department.department_name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="link" className="block font-medium">Link</label>
            <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2 hover:bg-blue-600">Create Camera</button>
        </form>
      </div>
    </div>
  );
};

export default CameraForm;
