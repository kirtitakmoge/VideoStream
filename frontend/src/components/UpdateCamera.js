import React, { useState, useEffect } from 'react';
import  {toast} from "react-hot-toast";
import { useParams } from 'react-router-dom';
const UpdateCamera = () => {
  const [formData, setFormData] = useState({
    ipAddress: '',
    deviceId: '',
    streamKey: '',
    departmentId: '',
    link: '',
    bucketName: '',
    accessbucket: ''
  });
  const {cameraId}=useParams();
const token=localStorage.getItem("token");
  useEffect(() => {
    const fetchCameraData = async () => {
        try {
          
            if (!token) {
                // Handle case where token is not available
                return;
            }
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/camera/getCameraById/${cameraId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}` // Include the token in the Authorization header
                },
            });
            
            if (response.status === 200) {
                const formData = await response.json();
                setFormData(formData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    fetchCameraData();
}, [cameraId]);

  const handleChange = e => {
   
    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value 
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    try {
          
        if (!token) {
            // Handle case where token is not available
            return;
        }
        
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/camera/updateCameraById/${cameraId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                 "Authorization": `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            toast.success(`Device Updated SuccessFully`, {
              duration: 2000,
              position: "top-center",
            });
            
          } else {
            const errorMessage = await response.text();
            toast.error(`Device updation unsuccessfull  ${errorMessage}`, {
              duration: 2000,
              position: "top-center",
            });
    } }catch (error) {
        console.error('Error fetching user data:', error);
    }

  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl w- font-bold mb-4">Update Camera</h2>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="ipAddress" className="text-lg mb-1">IP Address:</label>
        <input type="text" id="ipAddress" name="ipAddress" value={formData.ipAddress} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="deviceId" className="text-lg mb-1">Device ID:</label>
        <input type="text" id="deviceId" name="deviceId" value={formData.deviceId} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="departmentId" className="text-lg mb-1">Department ID:</label>
        <input type="text" id="departmentId" name="departmentId" value={formData.departmentId} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="link" className="text-lg mb-1">Link:</label>
        <input type="text" id="link" name="link" value={formData.link} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="streamKey" className="text-lg mb-1">Stream Key:</label>
        <input type="text" id="streamKey" name="streamKey" value={formData.streamKey} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="bucketName" className="text-lg mb-1">Wasabi Bucket Name:</label>
        <input type="text" id="bucketName" name="bucketName" value={formData.bucketName} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
      </div>
      <div className="flex flex-col">
        <label htmlFor="accessbucket" className="text-lg mb-1">Allowed to Access Bucket:</label>
        <input type="text" id="accessbucket" name="accessbucket" value={formData.accessbucket} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2" />
      </div>
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
    </form>
  </div>
  );
};

export default UpdateCamera;
