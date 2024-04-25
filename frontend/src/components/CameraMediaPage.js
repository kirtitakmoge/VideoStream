import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { FaShare, FaTrash } from "react-icons/fa"; // Import the share and trash icons from react-icons/fa
//this for hospital admin bucket data
const CameraMediaPage = () => {
  const [devicePhotos, setDevicePhotos] = useState([]);
  const [deviceVideos, setDeviceVideos] = useState([]);
  const { cameraId } = useParams();
  const[userId,setUserId]=useState();
  const token=localStorage.getItem("token");
  const surgeonId=localStorage.getItem("id");
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

 

const handleShareMedia = async (media) => {
  
  if (media.length === 0 ) {
   
    alert("Please select media and enter user ID.");
    return;
  }
  console.log(media.url);
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patientcontent/createPatientContents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        userId:"661d83353ec48f2e3af17a5f",
         surgeonId:surgeonId,
        link:media.url
      }),
    });
   
    if (!response.ok) {
      throw new Error('Failed to assign media.');
    }
    
    toast.success(`Shared ${media.key} media items to patient 661d83353ec48f2e3af17a5f}`, {
      duration: 2000,
      position: "top-center",
    });
    
    console.log(`Assigned ${media.key} media items to user 661d83353ec48f2e3af17a5f}`);
  } catch (error) {
    console.error('Error assigning media:', error);
    toast.error(`Error in sharing  media to patient`, {
      duration: 2000,
      position: "top-center",
    });
  }
};


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


  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl text-center font-bold mb-4">Camera Media</h2>
      <div className="grid grid-cols-3 gap-4">
        {devicePhotos.map(photo => (
          <div key={photo.id} className="relative">
            <img src={photo.url} alt="Photo" className="object-cover w-full h-48" />
            <div className="absolute  top-2 right-2">
              <FaShare
                className="text-blue-500 cursor-pointer mr-2 top-2 right-2"
                onClick={() => handleShareMedia(photo)}
              />
              </div>
              <div className="absolute bottom-2 right-2">
              <FaTrash
                className="text-red-500 cursor-pointer "
                onClick={() => handleDeleteMedia(photo)}
              />
            </div>
          </div>
        ))}
        {deviceVideos.map(video => (
          <div key={video.id} className="relative">
            <video controls className="object-cover w-full h-48">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute  top-2 right-2">
              <FaShare
                className="text-blue-500 cursor-pointer mr-2 top-2 right-2"
                onClick={() => handleShareMedia(video)}
              />
              </div>
              <div className="absolute bottom-2 right-2">
              <FaTrash
                className="text-red-500 cursor-pointer "
                onClick={() => handleDeleteMedia(video)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraMediaPage;
