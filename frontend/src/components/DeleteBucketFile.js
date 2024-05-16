import React from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {useAuth} from "./AuthContext"
const DeleteBucketFile = ({ media, surgeonId, token, cameraId, onDelete }) => {
  const {user}=useAuth();
  const handleDeleteMedia = async (media) => {
    if (!media) {
      toast.error("No media selected for deletion", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }

    const toastId = toast.loading("Deleting...", {
      position: "top-center",
    });
   
    
    if (!user) {
      toast.error("User not authenticated. Please log in.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    } let apiUrl;
    if(user.role==="Hospital Admin")
      {
        
    apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/deleteObjectFromBucket/${surgeonId}`;}
    if (user.role === "Super Admin") {
      apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/superAdmin/deleteObjectFromBucket/${surgeonId}`;
    }
    try {
      console.log(media.key);
      const response = await fetch(
        `${apiUrl}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            cameraId,
            objectKey: media.key,
          }),
        }
      );

      if (!response.ok) {
        toast.dismiss(toastId);
        toast.error(`Failed to delete ${media.key}`, {
          duration: 2000,
          position: "top-center",
        });
        throw new Error("Failed to delete media.");
      }

      onDelete();
      toast.dismiss(toastId);
      toast.success(`Deleted ${media.key}`, {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error("Error deleting media:", error);
      toast.dismiss(toastId);
      toast.error(`Error deleting ${media.key}`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <button
      onClick={() => handleDeleteMedia(media)}
      className="text-red-500  bg-gray-100 hover:bg-gray-300"
    >
      <FaTrash />
    </button>
  );
};

export default DeleteBucketFile;
