import React ,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
//Camera collection data  stored in mongodb 
const CameraData = () => {
  const [cameraData, setCameraData] = useState({
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
                const data = await response.json();
                setCameraData(data);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    fetchCameraData();
}, [cameraId]);

 
  return (
    <div className="max-w-md mx-auto mt-5 pt-0 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-center">Camera Details</h2>
     
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">IP Address:</label>
        <p>{cameraData.ipAddress}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Device ID:</label>
        <p>{cameraData.deviceId}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Stream Key:</label>
        <p>{cameraData.streamKey}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Department Name</label>
        <p>{cameraData.departmentId ? cameraData.departmentId.department_name
 : 'N/A'}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-wrap font-bold mb-2">Link:</label>
        <p className="whitespace-pre-wrap">{cameraData.link}</p>
      </div>
     
    
    </div>
  );
};

export default CameraData;
