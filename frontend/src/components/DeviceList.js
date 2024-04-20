// DeviceList.js
import React ,{useState,useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeviceList = () => {
const {departmentId}=useParams();
const [show,setShow]=useState(true);
const navigate=useNavigate();
  const [cameras, setCameras] = useState([]);

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
    navigate(`/surgeonbucket/${camera._id}`);
  };

  return (
    <div className=" m-5">
      <h2 className="text-2xl text-center font-bold mb-4">Devices</h2>
      <div className="grid grid-cols-3 gap-4">
        {cameras.map((camera) => (
          <div key={camera.id} className="bg-gray-200 h-23 p-4 rounded-md cursor-pointer hover:bg-gray-200" onClick={() => handleDeviceClick(camera)}>
            <div className="text-black text-center"> {camera.deviceId}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceList;
