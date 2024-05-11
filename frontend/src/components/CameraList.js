import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle ,FaToggleOn} from 'react-icons/fa';
import {toast} from "react-hot-toast"
import { useAuth } from "./AuthContext";

import CameraListItem from "./CameraListItem";

const CameraList = () => {
  const [cameras, setCameras] = useState([]);
  
  const navigate = useNavigate();
  const { departmentId } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    async function fetchCameras() {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/camera/getCamerasByDepartmentId/${departmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const cameraData = await response.json();
        setCameras(cameraData);
      } catch (error) {
        console.error("Error fetching cameras:", error);
      }
    }

    fetchCameras();
  }, [departmentId]);

 

  const handleUpdate = (cameraId) => {
   navigate(`/updateCamera/${cameraId}`);
  };
  const handleInfo=(cameraId)=>{
    navigate(`/cameraData/${cameraId}`);
  }

  const handleDelete = async (cameraId) => {
    try {
      alert(cameraId)
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/camera/deleteCameraById/${cameraId}`,
        {
          method:"DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        toast.error(`Error in Camera Deletion`, {
          duration: 2000,
          position: "top-center",
        });
        
        throw new Error("Failed to delete camera");
      }
      if(response.ok)
        {
          toast.success(`Camera Deleted SuccessFully`, {
            duration: 2000,
            position: "top-center",
          });
          
        }
      setCameras((prevCameras) =>
        prevCameras.filter((camera) => camera._id !== cameraId)
      );
    } catch (error) {
      console.error("Error deleting camera:", error);
    }
  };

  return (
    <>
      <div className="col-span-3 mt-5">
        <h2 className="text-2xl text-center font-bold mb-4">Cameras</h2>
        <div className="flex">
          {cameras.map((camera, index) => (
            <div
              key={camera._id}
              className="bg-gray-100 h-23 mr-5 p-4 rounded-md hover:bg-gray-200"
            >
             <CameraListItem camera={camera}/>
              { (user.role==="Super Admin") ?
              <div className="flex justify-center">
                <div className=" mr-5" onClick={() => handleUpdate(camera._id)}>
                  <FaEdit className="text-blue-500 cursor-pointer" size={20} />
                  <span className="hover-text">Edit</span>
                </div>
                <div className=" mr-5" onClick={() => handleDelete(camera._id)}>
                  <FaTrash className="text-red-500 cursor-pointer " size={20} />
                  <span className="hover-text">Delete</span>
                </div>
                <div className="mr-5" onClick={() => handleInfo(camera._id)}>
                  <FaInfoCircle className="text-gray-500 cursor-pointer" size={20} />
                  <span className="hover-text">Info</span>
                </div>
                <div className="mr-5" onClick={() => handleInfo(camera._id)}>
                <FaToggleOn
                    className="text-red-500 cursor-pointer"
                    size={20}

                  /><span className="hover-text">Enable</span></div>
              </div> :
              <div className=" self-center" onClick={() => handleInfo(camera._id)}>
                  <FaInfoCircle className="text-gray-500 cursor-pointer" size={20} />
                  <span className="hover-text">Info</span>
                </div>}
            </div>
          ))}
        </div>
      </div>

     
    </>
  );
};

export default CameraList;
