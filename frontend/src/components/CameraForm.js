import React, { useState, useEffect } from 'react';
import {useParams} from "react-router-dom";
import {toast} from "react-hot-toast"
const CameraForm = () => {
  const [departments, setDepartments] = useState([]);
  const {departmentId}=useParams();
  const reset={
    Specialization: '',
    ipAddress: '',
    deviceId: '',
    streamKey: '',
    departmentId:departmentId,
    link: ''
  }
  const [formData, setFormData] = useState(reset);
  

    const adminId=localStorage.getItem("id");
    // Fetch departments when component mounts
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
        toast.success(`Camera Created successfully`, {
          duration: 2000,
          position: "top-center",
        });
        setFormData(reset);
        console.log("Camera created successfully!");
      } else {
        // Handle non-successful responses (status codes other than 2xx)
        const errorMessage = await response.text();
        console.error(errorMessage);
        toast.error(`Failed to create Camera`, {
          duration: 2000,
          position: "top-center",
        });
        setFormData(reset);
      }
    } catch (error) {
      console.error('Error creating camera:', error);
    }
  };

  return (
    <div className="container mt-10 mx-auto">
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
