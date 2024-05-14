import React from "react";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-hot-toast";

const DeleteBucketFile = ({ media, surgeonId, token, cameraId,onDelete }) => {
    // Function to handle deletion of media
    const handleDeleteMedia = async (media) => {
      if (!media) {
        return;
      }
      try {
        console.log(media.key);
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bucket/device/deleteObjectFromBucket/${surgeonId}`, {
          method:'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            cameraId,
            objectKey: media.key,
          }),
        });
    
        if (!response.ok) {
          toast.error(`Failed ${media.key} media items}`, {
            duration: 2000,
            position: "top-center",
          });
          throw new Error('Failed to delete media.');
        }
        onDelete();
        toast.success(`Deleted ${media.key} media items}`, {
          duration: 2000,
          position: "top-center",
        });
       
              } catch (error) {
        console.error('Error deleting media:', error);
      }
    };

  return (
    <button onClick={() => handleDeleteMedia(media)} className="text-red-500 pr-6 bg-gray-100 hover:bg-gray-300">
      <FaTrash />
    </button>
  );
};

export default DeleteBucketFile;
