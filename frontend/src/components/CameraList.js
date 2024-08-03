import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaInfoCircle, FaToggleOn } from 'react-icons/fa';
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

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

  const handleInfo = (cameraId) => {
    navigate(`/cameraData/${cameraId}`);
  };

  const handleDelete = async (cameraId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/camera/deleteCameraById/${cameraId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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
      toast.success(`Camera Deleted Successfully`, {
        duration: 2000,
        position: "top-center",
      });
      setCameras((prevCameras) =>
        prevCameras.filter((camera) => camera._id !== cameraId)
      );
    } catch (error) {
      console.error("Error deleting camera:", error);
    }
  };

  if (user)
    return (
      <div className="container items-center mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl text-center font-bold mb-4">Cameras</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {cameras.map((camera) => (
            <div
              key={camera._id}
              className="bg-gray-200 shadow-md rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative p-4 group">
                <video
                  src={camera.videoUrl}
                  controls
                  className="w-full h-auto rounded-md transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              {user.role === "Super Admin" && (
                <div className="flex justify-around p-4 bg-transparent">
                  <div onClick={() => handleUpdate(camera._id)} className="cursor-pointer flex flex-col items-center text-blue-500">
                    <FaEdit size={20} />
                    <span className="text-sm">Edit</span>
                  </div>
                  <div onClick={() => handleDelete(camera._id)} className="cursor-pointer flex flex-col items-center text-red-500">
                    <FaTrash size={20} />
                    <span className="text-sm">Delete</span>
                  </div>
                  <div onClick={() => handleInfo(camera._id)} className="cursor-pointer flex flex-col items-center text-gray-500">
                    <FaInfoCircle size={20} />
                    <span className="text-sm">Info</span>
                  </div>
                  <div onClick={() => handleInfo(camera._id)} className="cursor-pointer flex flex-col items-center text-green-500">
                    <FaToggleOn size={20} />
                    <span className="text-sm">Enable</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
};

export default CameraList;
