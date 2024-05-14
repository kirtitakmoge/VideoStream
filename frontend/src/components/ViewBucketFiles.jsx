import React, { useState, useEffect } from "react";

import DeleteBucketFile from "./DeleteBucketFile";
//import RenameComponent from './RenameComponent';
//import ShareComponent from './ShareComponent';
import { useParams } from "react-router-dom";
import RenameBucketFile from "./RenameBucketFile";
import DownloadBucketFile from "./DownloadBucketFile";
import UploadBucketFile from "./UploadBucketFile";
import ShareBucketFile from "./ShareBucketFiles";
import { FaCheckCircle, FaCircle } from "react-icons/fa";
const ViewBucketFiles = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const { cameraId, departmentId } = useParams();
  const [selectedMedia, setSelectedMedia] = useState([]);
  const [isFinish, setISFinish] = useState(false);
  const ActionType = {
    NONE: "none",
    UPLOAD: "upload",
    DELETE: "delete",
    RENAME: "rename",
  };
  const [actionType, setActionType] = useState(ActionType.NONE); // State to track action type

  // Function to handle media deletion
  const handleMediaDelete = (deletedMediaKey) => {
    // Update the action type state to trigger useEffect

    setActionType(ActionType.DELETE);
    // Other logic to delete media
  };

  // Function to handle media upload
  const handleMediaUpload = () => {
    // Update the action type state to trigger useEffect
    setActionType(ActionType.UPLOAD);
    // Other logic to upload media
  };

  // Function to handle media rename
  const handleMediaRename = () => {
    // Update the action type state to trigger useEffect
    setActionType(ActionType.RENAME);
    // Other logic to rename media
  };

  const toggleSelectMedia = (media) => {
    alert(`selected or deselected ${selectedMedia.length}`);
    setSelectedMedia((prevSelectedMedia) => {
      if (prevSelectedMedia.some((item) => item.key === media.key)) {
        // If the media is already selected, remove it
        return prevSelectedMedia.filter((item) => item.key !== media.key);
      } else {
        // If the media is not selected, add it
        return [...prevSelectedMedia, media];
      }
    });
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
    <div className="grid grid-cols-3 gap-4">
      {/* Render media files */}
      {mediaFiles.map((media) => (
        <div key={media.id} className="relative">
          <div className="bg-gray-100 text-xl w-full font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
            {media.key}
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-50 p-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-row x-space-7">
                  
                  <DeleteBucketFile
                    media={media}
                    surgeonId={surgeonId}
                    token={token}
                    cameraId={cameraId}
                    onDelete={handleMediaDelete}
                     
                  />
                  <RenameBucketFile
                    media={media}
                    surgeonId={surgeonId}
                    token={token}
                    cameraId={cameraId}
                    onMediaRename={handleMediaRename} // Pass your rename handler here
                  />
                  <DownloadBucketFile
                    media={media}
                    surgeonId={surgeonId}
                    token={token}
                    cameraId={cameraId}
                  />
                </div>
                {/*}
              <ShareComponent media={media} />
    </div>*/}
                <div key={media.key} onClick={() => toggleSelectMedia(media)}>
                  {selectedMedia.find(
                    (selectedFile) => selectedFile.key === media.key
                  ) ? (
                    <FaCheckCircle className="text-green-500 bg-gray-100 hover:bg-grey-300" />
                  ) : (
                    <FaCircle className="text-gray-500  bg-gray-100 hover:bg-grey-300" />
                  )}
                  {/* Render other file details here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <UploadBucketFile
        surgeonId={surgeonId}
        token={token}
        cameraId={cameraId}
        onMediaUpload={handleMediaUpload}
      />
      {!isFinish && (
        <button
          onClick={() => setISFinish(true)}
          className="bg-gray-100  hover:bg-gray-300 text-black font-bold py-2 px-4 rounded"
        >
          Finish Selection
        </button>
      )}
      {isFinish && (
        <ShareBucketFile
          cameraId={cameraId}
          departmentId={departmentId}
          mediaFiles={selectedMedia}
        />
      )}
    </div>
  );
};

export default ViewBucketFiles;
