import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
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
  const [hospitals, setHospitals] = useState([]);
  const [departments, setDepartments] = useState([]);
  const { cameraId } = useParams();
  const token = localStorage.getItem("token");

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
        console.error('Error fetching camera data:', error);
      }
    };

    const fetchHospitals = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/getAllHospitals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.status === 200) {
          const hospitals = await response.json();
          setHospitals(hospitals);
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      }
    };

    fetchCameraData();
    fetchHospitals();
  }, [cameraId, token]);

  const handleChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setFormData(prevState => ({
      ...prevState,
      [e.target.name]: value
    }));

    if (e.target.name === 'hospitalId') {
      fetchDepartments(e.target.value);
    }
  };

  const fetchDepartments = async (hospitalId) => {
    try {
      console.log(hospitalId)
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospitalId/${hospitalId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 200) {
        const departments1 = await response.json();
        console.log(departments);
        console.log(departments1.departments);
        
        setDepartments(departments1.departments);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSubmit = async (e) => {
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
        toast.success(`Device Updated Successfully`, {
          duration: 2000,
          position: "top-center",
        });
      } else {
        const errorMessage = await response.text();
        toast.error(`Device updation unsuccessful: ${errorMessage}`, {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error('Error updating camera data:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Update Camera</h2>
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
          <label htmlFor="hospitalId" className="text-lg mb-1">Hospital:</label>
          <select id="hospitalId" name="hospitalId" value={formData.hospitalId} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2">
            <option value="">Select a hospital</option>
            {hospitals.map(hospital => (
              <option key={hospital._id} value={hospital._id}>{hospital.Hospital_Name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="departmentId" className="text-lg mb-1">Department:</label>
          <select id="departmentId" name="departmentId" value={formData.departmentId} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2">
            <option value="">Select a department</option>
            {departments.map(department => (
              <option key={department._id} value={department._id}>{department.department_name
                }</option>
            ))}
          </select>
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
          <select
            id="accessbucket"
            name="accessbucket"
            value={formData.accessbucket ? "true" : "false"}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2"
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Update</button>
      </form>
    </div>
  );
};

export default UpdateCamera;
