// DownloadBucketFile.js
import React from "react";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";

const DownloadBucketFile = ({ media, surgeonId, token, cameraId }) => {
  const handleDownloadMedia = async () => {
    if (!media) {
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/bucket/device/downloadObjectFromBucket/${surgeonId}`,
        {
          method: "POST",
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
        toast.error(`Failed to download ${media.key}`, {
          duration: 2000,
          position: "top-center",
        });
        throw new Error("Failed to download media.");
      }
      if (response.ok) {
        const { downloadUrl } = await response.json();
        downloadFile(downloadUrl);
      } else {
        console.error('Error fetching download URL:', response.statusText);
      }
      // Convert response to blob
    } catch (error) {
      console.error("Error downloading media:", error);
    }
  };
// Function to initiate the download using the pre-signed URL
const downloadFile = async (downloadUrl) => {
    try {
      // Use the pre-signed URL to initiate the download
      const response = await fetch(downloadUrl);
      toast.success('Downloading started!', {
        duration: 2000,
        position: 'top-center'
      });
      // Check if the response is successful
      if (response.ok) {
        // Convert the response to a blob and create a temporary URL for downloading
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        // Create a temporary link and trigger the download
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', media.key); // Set desired file name
        document.body.appendChild(link);
        link.click();
  
        // Clean up after the download
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success(`${media.key} Downloading finished !`, {
            duration: 2000,
            position: 'top-center'
          });
      } else {
        // Handle error response
        console.error('Error downloading file:', response.statusText);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  return (
    <button onClick={handleDownloadMedia} className="text-blue-400 pr-6 pl-6 bg-gray-100 hover:bg-gray-300 ">
      <FaDownload />
    </button>
  );
};

export default DownloadBucketFile;
