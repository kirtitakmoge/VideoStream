import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaShare } from "react-icons/fa"; // Import the share icon from react-icons/fa
import toast from "react-hot-toast";
const SurgeonBucket = () => {
  const [devicePhotos, setDevicePhotos] = useState([]);
  const [deviceVideos, setDeviceVideos] = useState([]);
  const { cameraId } = useParams();
  const [userId, setUserId] = useState("");
  const [input, setInput] = useState(false);
  const[selectmedia,setSelectedmedia]=useState();

  useEffect(() => {
    async function fetchData() {
      try {
        const photosResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/bucket/device/${cameraId}`
        );

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
  }, [cameraId]);const handleShareMedia = async () => {
    const surgeonId = localStorage.getItem("id");
    if (!selectmedia) {
      alert("Please select media and enter user ID.");
      return;
    }
    try {
      const token=localStorage.getItem("token");
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/patientcontent/patientContents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({
            userId: userId,
            surgeonId: surgeonId,
            link: selectmedia.url,
          }),
        }
      );
      setSelectedmedia(null);
      setInput(false);
      setUserId("");
      toast.success(`Shared media item to patient ${userId}`, {
        duration: 2000,
        position: "top-center",
      });
      if (!response.ok) {
        throw new Error("Failed to assign media.");
      }


    
      
    } catch (error) {
      console.error("Error assigning media:", error);
      toast.error(`Failed to share media item to user ${userId}`, {
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
            />
            <div className="absolute top-2 right-2">
              <FaShare
                className="text-blue-500 cursor-pointer mr-2"
                onClick={() => {
                  setInput(true);
                 setSelectedmedia(photo)
                }}
              />
            </div>
          </div>
        ))}
        {deviceVideos.map((video) => (
          <div key={video.id} className="relative">
            <video controls className="object-cover w-full h-48">
              <source src={video.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute top-2 right-2">
              <FaShare
                className="text-blue-500 cursor-pointer mr-2"
                onClick={() => {
                  setInput(true);
                 setSelectedmedia(video);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurgeonBucket;
