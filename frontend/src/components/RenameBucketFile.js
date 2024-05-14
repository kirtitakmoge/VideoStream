// RenameBucketFile.js
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import Overlay from "./Overlay";
const RenameBucketFile = ({ media, surgeonId, token, cameraId, onMediaRename }) => {
  const [newName, setNewName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false); // State to toggle rename input

  const handleRenameMedia = async () => {
    if (!media || !newName) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/bucket/device/renameObjectInBucket/${surgeonId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cameraId,
            objectKey: media.key,
            newName: newName.trim(), // Trim the new name
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

      toast.success(`Renamed ${media.key} to ${newName}`, {
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
    }
  };

  return (
    <div>
      {/* Render rename icon */}
      <span onClick={() => {setIsRenaming(true);}}> <FaEdit className="text-black-500  bg-gray-100 cursor-pointer hover:bg-gray-300"/></span>

      {/* Render input box as an overlay */}
      {isRenaming && (
       
              <Overlay
              show={isRenaming}
              heading="Rename File "
              onClose={()=>{ alert("onclose");setIsRenaming(false)}}
              message={
                <div>
                  <label htmlFor="newDepartmentName" className="text-center">New Department Name</label>
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
