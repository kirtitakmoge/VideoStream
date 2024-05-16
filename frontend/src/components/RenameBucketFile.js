import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import Overlay from "./Overlay";
import {useAuth} from "./AuthContext"
const RenameBucketFile = ({ media, surgeonId, token, cameraId, onMediaRename }) => {
  const [newName, setNewName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false); // State to toggle rename input
const {user}=useAuth();
  const handleRenameMedia = async () => {
    alert(user.role);
    if (!media || !newName) {
      toast.error("Please provide a new name.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    // Extract the file extension
    const fileExtension = media.key.substring(media.key.lastIndexOf('.'));
    const baseName = newName.trim();
// Show a loading toast message
const toastId = toast.loading("Renaming...", {
  duration: 2000,
  position: "top-center",
});
    if (baseName.includes('.')) {
      toast.error("New name should not include a file extension.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    const newFileName = `${baseName}${fileExtension}`;
  
    
      try {
        if (!user) {
          toast.error("User not authenticated. Please log in.", {
            duration: 2000,
            position: "top-center",
          });
          return;
        }
        let apiUrl;
        alert(user.role);
        if(user.role==="Hospital Admin")
          {
            
        apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/renameObjectInBucket/${surgeonId}`;}
        if (user.role === "Super Admin") {
          apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/superAdmin/renameObjectInBucket/${surgeonId}`;
        }
      const response = await fetch(
        `${apiUrl}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cameraId,
            objectKey: media.key,
            newName: newFileName,
          }),
        }
      );

      if (!response.ok) {
        toast.error(`Failed to rename ${media.key}`, {
          duration: 2000,
          position: "top-center",
        });
        throw new Error("Failed to rename media.");
      }

      toast.success(`Renamed ${media.key} to ${newFileName}`, {
        id: toastId,
        duration: 2000,
        position: "top-center",
      });

      // Call the onMediaRename callback function provided by the parent component
      onMediaRename();

      // Reset the newName state after successful rename
      setNewName("");
      // Hide the input box after successful rename
      setIsRenaming(false);
    } catch (error) {
      console.error("Error renaming media:", error);
      toast.error("An error occurred while renaming the file.", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div>
      {/* Render rename icon */}
      <span onClick={() => setIsRenaming(true)}>
        <FaEdit className="text-black-500 bg-gray-100 cursor-pointer " />
      </span>

      {/* Render input box as an overlay */}
      {isRenaming && (
        <Overlay
          show={isRenaming}
          heading="Rename File"
          onClose={() => setIsRenaming(false)}
          message={
            <div>
              <label htmlFor="newName" className="text-center">
                New File Name
              </label>
              <input
                type="text"
                id="newName"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="border my-4 border-gray-300 px-3 py-2 rounded-md w-full mb-4"
              />
            </div>
          }
          onRename={handleRenameMedia}
        />
      )}
    </div>
  );
};

export default RenameBucketFile;
