// DeviceList.js
import React ,{useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import{useAuth} from "./AuthContext"
const DeviceList = () => {
 
const {user}=useAuth();
const [show,setShow]=useState(true);
const navigate=useNavigate();
  const [cameras, setCameras] = useState([]);
const{departmentId}=useParams();
  useEffect(() => {
    async function fetchCameras() {
      try {
        const token=localStorage.getItem("token");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/camera/getCamerasByDepartmentId/${departmentId}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
               "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cameraData = await response.json();
        setCameras(cameraData);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    }

    fetchCameras();
  }, [departmentId]);

  const handleDeviceClick = (camera) => {
    if(user.role=="Super Admin")
      navigate(`/device/${camera._id}/${departmentId}`)
    else

    navigate(`/surgeonbucket/${camera._id}`);
    

  };
if(user)
  return (
<div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
      <h1 className="text-2xl font-bold text-center mb-10">Devices</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 m">
    
        {cameras.map((camera) => (
          <div key={camera._id} className="bg-gray-200 h-23 p-4 rounded-md cursor-pointer hover:bg-gray-200 hover:box-border border-2" onClick={() => handleDeviceClick(camera)}>
            <div className="text-black text-center"> {camera.deviceId}</div>
        
          </div>
        ))}
      
    </div>
    </div>
  );
};

export default DeviceList;
