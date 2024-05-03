import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShare, FaTrash, FaCheckCircle, FaCircle } from "react-icons/fa"; // Import the share, trash, and icon for selection from react-icons/fa

const CameraMediaPage = () => {
  const [devicePhotos, setDevicePhotos] = useState([]);
  const [deviceVideos, setDeviceVideos] = useState([]);
  const { cameraId } = useParams();
  const [userId, setUserId] = useState("");
  const [selectedMedia, setSelectedMedia] = useState([]);
  const token = localStorage.getItem("token");
  const surgeonId = localStorage.getItem("id");

  useEffect(() => {
    async function fetchData() {
      try {
        const photosResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/bucket/device/getObjectFromBucket/${cameraId}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          },
        });

        if (!photosResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const photosData = await photosResponse.json();
        console.log(photosData);

        setDevicePhotos(photosData.photoUrls);
        setDeviceVideos(photosData.videoUrls);

      } catch (error) {
        console.error('Error fetching camera media:', error);
      }
    }

    fetchData();
  }, [cameraId]);

 // Function to handle sharing of media
const handleShareMedia = async () => {
  if (selectedMedia.length === 0 || !userId.trim()) {
      toast.error("Please select media and enter user ID.");
      return;
  }
  console.log(selectedMedia);
  const a = selectedMedia.map(media => media.url);
 alert(a.length);
  try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patientcontent/createPatientContents`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
              userId,
              surgeonId,
              link: a
          }),
      });

      const responseData = await response.json();

      if (!response.ok) {
          throw new Error(responseData.message || 'Failed to assign media.');
      }

      toast.success(`Shared ${selectedMedia.length} media items to patient ${userId}`, {
          duration: 2000,
          position: "top-center",
      });

      console.log(`Assigned ${selectedMedia.length} media items to user ${userId}`);
  } catch (error) {
      console.log('Error sharing media:', error);
     
          toast.error(` ${error}`, {
              duration: 2000,
              position: "top-center",
          });
      
  }
};

  // Function to handle deletion of media
 
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
    toast.success(`Deleted ${media.key} media items}`, {
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
    
  
    
  }
};
const toggleSelectMedia = (media) => {
  alert(`selected or deselected ${selectedMedia.length}`);
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
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
        <button
          onClick={handleShareMedia}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Share
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
      {devicePhotos.map(photo => (
  <div key={photo.id} className="relative">
    <img
      src={photo.url}
      alt="Photo"
      className={`object-cover w-full h-48 ${selectedMedia.includes(photo) ? 'border border-green-500' : ''}`}
      onClick={() => toggleSelectMedia(photo)}
    />
    <div className="absolute bottom-2 right-2 flex items-center">
      <FaTrash
        className="text-red-500 cursor-pointer mr-2"
        onClick={() => handleDeleteMedia(photo)}
      />
      {selectedMedia.includes(photo) && <FaCheckCircle className="text-green-500 cursor-pointer" />}
    </div>
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
    <div className="absolute bottom-2 right-2 flex items-center">
      <FaTrash
        className="text-red-500 cursor-pointer mr-2"
        onClick={() => handleDeleteMedia(video)}
      />
      {selectedMedia.includes(video) && <FaCheckCircle className="text-green-500 cursor-pointer" />}
    </div>
  </div>
))}


      </div>
    </div>
  );
};
export default CameraMediaPage;
