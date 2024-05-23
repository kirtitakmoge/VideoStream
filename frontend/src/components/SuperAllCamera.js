import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const SuperAllCamera= () => {
  const [cameras, setCameras] = useState([]);
  const navigate=useNavigate();
const superAdminId=localStorage.getItem("id");
  useEffect(() => {
    const fetchCameraData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/camera/getAllCameras/${superAdminId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCameras(data);
        }
      } catch (error) {
        console.error('Error fetching camera data:', error);
      }
    };

    fetchCameraData();
  }, [superAdminId]);

  const handleUpdate = (cameraId) => {
    navigate(`/updateCamera/${cameraId}`);
   };
  return (
    <div className="container mx-auto px-4 mt-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Camera Details</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">IP Address</th>
              <th className="px-4 py-2">Device ID</th>
              
              <th className="px-4 py-2">Department Name</th>
              <th className="px-4 py-2">Link</th>
              <th className="px-4 py-2">BucketName</th>
              <th className="px-4 py-2">Update</th>
                          </tr>
          </thead>
          <tbody>
            {cameras.map(camera => (
              <tr key={camera._id}>
                <td className="border px-4 py-2">{camera.ipAddress}</td>
                <td className="border px-4 py-2">{camera.deviceId}</td>
              
                <td className="border px-4 py-2">{camera.departmentId ? camera.departmentId.department_name : 'N/A'}</td>
                <td className="border px-4 py-2">{camera.link}</td>
                <td className="border px-4 py-2">{camera.bucketName}</td>
                <td className="border px-4 py-2"><button  className="text-l p-2 rounded-md shadow-sm bg-red-500" onClick={()=>{handleUpdate(camera._id)}}> Update</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SuperAllCamera;
