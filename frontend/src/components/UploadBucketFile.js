import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {useAuth} from "./AuthContext";
const UploadBucketFile = ({ surgeonId, cameraId,  onMediaUpload }) => {
  const {user} =useAuth();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isFileValid, setIsFileValid] = useState(true);
  const token=localStorage.getItem("token");
  
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const maxSize = 10 * 1024 * 1024; // 10 MB
    const allowedTypes = [
      "image/jpeg", "image/png", "image/gif", "image/bmp", "image/tiff", "image/webp",
      "video/mp4", "video/mpeg", "video/quicktime", "video/x-msvideo", "video/x-ms-wmv",
      "video/3gpp", "video/ogg", "video/webm", "video/x-flv", "video/avi",
      "application/pdf"
    ];

    if (!file) {
      setIsFileValid(false);
      return;
    }

    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file type. Only images, videos, and PDFs are allowed.", {
        duration: 2000,
        position: "top-center",
      });
      setIsFileValid(false);
      return;
    }

    if (file.size > maxSize) {
      toast.error("File size exceeds the 10 MB limit.", {
        duration: 2000,
        position: "top-center",
      });
      setSelectedFile(null);
      setIsFileValid(false);
      return;
    }

    setSelectedFile(file);
    setIsFileValid(true);
  };
  const handleUploadFile = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }
    if (!user) {
      toast.error("User not authenticated. Please log in.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    } let apiUrl;
    if(user.role==="Hospital Admin")
      {
        
    apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/generateUploadUrl/${surgeonId}`;}
    if (user.role === "Super Admin") {
      apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/superadmin/generateUploadUrl/${surgeonId}`;
    }
    
      
    const toastId = toast.loading("Uploading...", {
      position: "top-center",
    });

    try {
      const response = await fetch(
        `${apiUrl}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            surgeonId,
            cameraId,
            fileName: selectedFile.name,
          }),
        }
      );

      if (!response.ok) {
        toast.dismiss(toastId);
        toast.error("Failed to generate upload URL", {
          duration: 2000,
          position: "top-center",
        });
        return;
      }

      const uploadUrl = await response.json();

      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type,
        },
        body: selectedFile,
      });

      if (!uploadResponse.ok) {
        toast.dismiss(toastId);
        toast.error("Failed to upload file", {
          duration: 2000,
          position: "top-center",
        });
        return;
      }

    
      toast.dismiss(toastId);
      toast.success("File uploaded successfully", {
        duration: 2000,
        position: "top-center",
      });
      onMediaUpload();
      setIsOverlayVisible(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.dismiss(toastId);
      toast.error("Failed to upload file", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const toggleOverlay = () => {
    setIsOverlayVisible(!isOverlayVisible);
  };

  return (
    <div>
      <button
        onClick={toggleOverlay}
        className="flex items-center px-4 py-3   bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 "
      >
        <FaUpload className="mr-2" />
        Upload
      </button>

      {isOverlayVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-center font-bold mb-4">Upload File</h2>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="flex justify-end mt-4 ">
            <button
                onClick={handleUploadFile}
                disabled={!isFileValid}
                className={`mr-2 px-4 py-2 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isFileValid ? "bg-green-500 hover:bg-green-600 focus:ring-green-500" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Upload
              </button>
              <button
                onClick={toggleOverlay}
                className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadBucketFile;
