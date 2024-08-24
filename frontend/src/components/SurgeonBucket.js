import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShareBucketFile from "./ShareBucketFiles";
import toast from "react-hot-toast";
import { FaCheckCircle, FaCircle, FaShare } from "react-icons/fa";
import ReactPlayer from "react-player";
import DownloadBucketFile from "./DownloadBucketFile";
const SurgeonBucket = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const { cameraId, departmentId } = useParams();
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isFinish, setIsFinish] = useState(false);
  const ActionType = {
    NONE: "none",
    UPLOAD: "upload",
    DELETE: "delete",
    RENAME: "rename",
  };
  const [actionType, setActionType] = useState(ActionType.NONE); // State to track action type

  // Function to handle media deletion
  const handleMediaDelete = (deletedMediaKey) => {
    setActionType(ActionType.DELETE);
    // Other logic to delete media
  };

  // Function to handle media upload
  const handleMediaUpload = () => {
    setActionType(ActionType.UPLOAD);
    // Other logic to upload media
  };

  // Function to handle media rename
  const handleMediaRename = () => {
    setActionType(ActionType.RENAME);
    // Other logic to rename media
  };

  const handleMediaShare = () => {
    setIsFinish(false);
  };

  const toggleSelectMedia = (media) => {
    if (selectedMedia.length === 0) {
      toast(
        `After your selection is finished, please click on finish selection`,
        {
          duration: 3000,
          position: "top-center",
        }
      );
    }
    setSelectedMedia((prevSelectedMedia) => {
      if (prevSelectedMedia.some((item) => item.key === media.key)) {
        // If the media is already selected, remove it
        return prevSelectedMedia.filter((item) => item.key !== media.key);
      } else {
        // If the media is not selected, add it
        return [...prevSelectedMedia, media];
      }
    });
    setIsFinish(false);
  };

  const surgeonId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const data = await fetch(
          `${process.env.REACT_APP_API_URL}/api/bucket/device/getObjectFromBucket/${cameraId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        if (!data.ok) {
          throw new Error("Network response was not ok");
        }
        if (data.ok) {
          const data1 = await data.json();
          console.log(data1.objectUrls);
          setMediaFiles(data1.objectUrls);
        }
      } catch (error) {
        console.error("Error fetching media files:", error);
      }
    };

    fetchMedia();
  }, [cameraId, actionType]);

  return (
    <div className="m-5">
      <h1 className="text-2xl font-bold m-5 text-center">Media files</h1>
      <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="flex flex-col gap-6 ">
          
          <div className="w-full h-full bg-gray-300 rounded-lg shadow-md hover:bg-slate-400">
            <button
              onClick={() => setIsFinish(true)}
              className="flex flex-col gap-2 items-center justify-center p-4 w-full h-full font-bold text-gray-800 focus:outline-none"
            >
              <span>Please select file </span>
              <span className="">Share</span>
              <FaShare className="mr-2" />
            </button>
            {isFinish && (
              <ShareBucketFile
                cameraId={cameraId}
                departmentId={departmentId}
                mediaFiles={selectedMedia}
                isShare={isFinish}
                onShare={handleMediaShare}
              />
            )}
          </div>
        </div>
        {/* Render media files */}
        {mediaFiles.map((media) => (
          <div
            key={media.key}
            className="relative bg-gray-200 text-xl w-full overflow-hidden overflow-wrap break-word h-full font-bold p-4 rounded-lg shadow-md hover:bg-slate-300 transition-transform transform hover:scale-105"
          >
            {media.key.endsWith(".mp4") || media.key.endsWith(".mov") ? (
              <ReactPlayer
                url={media.url}
                // Thumbnail image
                width="100%"
                height="200px"
                controls
              />
            ) : (
              <img
                src={media.url}
                alt={media.key}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <div className="mt-5">
              <div className="flex gap-4 justify-center bg-transparent">
               
                <DownloadBucketFile
                  media={media}
                  surgeonId={surgeonId}
                  token={token}
                  cameraId={cameraId}
                />
                <div onClick={() => toggleSelectMedia(media)}>
                  {selectedMedia.find(
                    (selectedFile) => selectedFile.key === media.key
                  ) ? (
                    <FaCheckCircle className="text-green-500" />
                  ) : (
                    <FaCircle className="text-gray-500" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurgeonBucket;
