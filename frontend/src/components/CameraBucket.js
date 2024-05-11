import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaTrash, FaCheckCircle } from "react-icons/fa"; // Import the trash icon for deletion from react-icons/fa
import { useAuth } from "./AuthContext";
const CameraBucket = ({ userRole }) => {
  const [devicePhotos, setDevicePhotos] = useState([]);
  const [deviceVideos, setDeviceVideos] = useState([]);
  const { cameraId } = useParams();
  const [selectedMedia, setSelectedMedia] = useState([]);
  const token = localStorage.getItem("token");
  const surgeonId = localStorage.getItem("id");
const {user}=useAuth();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/bucket/device/getObjectFromBucket/${cameraId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        setDevicePhotos(data.photoUrls);
        setDeviceVideos(data.videoUrls);

      } catch (error) {
        console.error('Error fetching camera media:', error);
      }
    }

    fetchData();
  }, [cameraId]);

  const handleShareMedia = async () => {
    if (selectedMedia.length === 0) {
      toast.error("Please select media to share.");
      return;
    }

    try {
      const links = selectedMedia.map(media => media.url);
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patientcontent/createPatientContents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: surgeonId,
          surgeonId,
          link: links
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to share media.');
      }

      toast.success(`Shared ${selectedMedia.length} media items successfully`, {
        duration: 2000,
        position: "top-center",
      });

      setSelectedMedia([]);
    } catch (error) {
      console.error('Error sharing media:', error);
      toast.error(`Error sharing media: ${error}`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const handleDeleteMedia = async (media) => {
    if (!media) {
      return;
    }

    try {
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
        throw new Error('Failed to delete media.');
      }

      toast.success(`Deleted ${media.key} media item successfully`, {
        duration: 2000,
        position: "top-center",
      });

      // Update the state after successful deletion
      if (media.key.endsWith(".jpg") || media.key.endsWith(".jpeg") || media.key.endsWith(".png")) {
        setDevicePhotos(prevPhotos => prevPhotos.filter(item => item.key !== media.key));
      } else if (media.key.endsWith(".mp4") || media.key.endsWith(".avi") || media.key.endsWith(".mov")) {
        setDeviceVideos(prevVideos => prevVideos.filter(item => item.key !== media.key));
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      toast.error(`Error deleting media: ${error}`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const toggleSelectMedia = (media) => {
    setSelectedMedia(prevSelectedMedia => {
      if (prevSelectedMedia.some(item => item.key === media.key)) {
        // If the media is already selected, remove it
        return prevSelectedMedia.filter(item => item.key !== media.key);
      } else {
        // If the media is not selected, add it
        return [...prevSelectedMedia, media];
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl text-center font-bold mb-4">Camera Media</h2>
      {userRole === "Hospital Admin" && (
        <div className="flex justify-between mb-4">
          <button
            onClick={handleShareMedia}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Share
          </button>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        {devicePhotos.map(photo => (
          <div key={photo.id} className="relative">
            <img
              src={photo.url}
              alt="Photo"
              className={`object-cover w-full h-48 ${selectedMedia.includes(photo) ? 'border border-green-500' : ''}`}
              onClick={() => toggleSelectMedia(photo)}
            />
            {user.role === "Hospital Admin" && (
              <div className="absolute bottom-2 right-2 flex items-center">
                <FaTrash
                  className="text-red-500 cursor-pointer mr-2"
                  onClick={() => handleDeleteMedia(photo)}
                />
                {selectedMedia.includes(photo) && <FaCheckCircle className="text-green-500 cursor-pointer" />}
              </div>
            )}
          </div>
        ))}
        {deviceVideos.map(video => (
          <div key={video.id} className="relative">
            <video
              controls
              className={`object-cover w-full h-48 ${selectedMedia.includes(video) ? 'border border-green-500' : ''}`}
              onClick={() => toggleSelectMedia(video)}
            >
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {(user.role === "Hospital Admin" || user.role==="Surgeon" ) && (
              <div className="absolute bottom-2 right-2 flex items-center">
                <FaTrash
                  className="text-red-500 cursor-pointer mr-2"
                  onClick={() => handleDeleteMedia(video)}
                />
                {selectedMedia.includes(video) && <FaCheckCircle className="text-green-500 cursor-pointer" />}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraBucket;
