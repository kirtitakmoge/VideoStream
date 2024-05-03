import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaShare } from "react-icons/fa"; // Import the share icon from react-icons/fa
import toast from "react-hot-toast";
import { FaCheckCircle} from "react-icons/fa"; 
const SurgeonBucket = () => {
  const [devicePhotos, setDevicePhotos] = useState([]);
  const [deviceVideos, setDeviceVideos] = useState([]);
  const { cameraId } = useParams();
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState(false);
  const[selectedMedia,setSelectedMedia]=useState([]);
 const token=localStorage.getItem("token");
 const surgeonId=localStorage.getItem("id");
  useEffect(() => {
    async function fetchData() {
      try {
        const photosResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/bucket/device/getObjectFromBucket/${cameraId}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          });
        

        if (!photosResponse.ok) {
          throw new Error("Network response was not ok");
        }

        const photosData = await photosResponse.json();
        console.log(photosData);

        setDevicePhotos(photosData.photoUrls);
        setDeviceVideos(photosData.videoUrls);
      } catch (error) {
        console.error("Error fetching camera media:", error);
      }
    }

    fetchData();
  }, [cameraId]);

  
const toggleSelectMedia = (media) => {
  setInput(true);
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

  // Function to handle sharing of media
const handleShareMedia = async () => {
  if (selectedMedia.length === 0 || !userId.trim()) {
      toast.error("Please select media and enter user ID.");
      return;
  }
  console.log(selectedMedia);
  const link = selectedMedia.map(media => media.url);
 alert(link.length);
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
              link: link
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Camera Media</h2>
      {input && (<>
        <div>
          <label htmlFor="userId" className="block mb-2">
            User ID:
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1 mb-4"
          />
        </div>
      
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={() =>  handleShareMedia()}
      >
        Share Media
      </button></>)}
      <div className="grid grid-cols-3 gap-4">
        {devicePhotos.map((photo) => (
          <div key={photo.id} className="relative">
            <img
              src={photo.url}
              alt="Photo"
              className="object-cover w-full h-48"
              onClick={() => toggleSelectMedia(photo)}
            />
            {selectedMedia.includes(photo) && <FaCheckCircle className="text-green-500 cursor-pointer" />}
          </div>
        ))}
        {deviceVideos.map((video) => (
          <div key={video.id} className="relative">
            <video controls className="object-cover w-full h-48"  onClick={() => toggleSelectMedia(video)}>
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {selectedMedia.includes(video) && (
              <FaCheckCircle className="text-green-500 cursor-pointer absolute top-2 right-2" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurgeonBucket;
