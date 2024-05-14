import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-hot-toast";

const UploadBucketFile = ({ surgeonId, cameraId, token,onMediaUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) {
      toast.error("Please select a file to upload", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/bucket/device/generateUploadUrl/${surgeonId}`,
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
        toast.error("Failed to generate upload URL", {
          duration: 2000,
          position: "top-center",
        });
        return;
      }

      const  uploadUrl  = await response.json();
      
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": selectedFile.type, // Set the Content-Type header based on the selected file's type
        },
        body: selectedFile,
      });
      
 console.log(uploadResponse)
      if (!uploadResponse.ok) {
        toast.error("Failed to upload file", {
          duration: 2000,
          position: "top-center",
        });
        return;
      }
     onMediaUpload();
      toast.success("File uploaded successfully", {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUploadFile} className=" rounded-md bg-gray-100 hover:bg-gray-300">
         Upload  <FaUpload className="text-green-400 bg-gray-100 hover:bg-gray-300"/>
      </button>
    </div>
  );
};

export default UploadBucketFile;
