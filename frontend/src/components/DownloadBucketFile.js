import React from "react";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-hot-toast";
import {useAuth} from "./AuthContext";
const DownloadBucketFile = ({ media, surgeonId, token, cameraId }) => {
  const {user}=useAuth();
  const handleDownloadMedia = async () => {
    if (!media) {
      toast.error("No media selected for download", {
        duration: 2000,
        position: "top-center",
      });
      return;
    }
    if (!user) {
      toast.error("User not authenticated. Please log in.", {
        duration: 2000,
        position: "top-center",
      });
      return;
    } let apiUrl;
    if(user.role==="Hospital Admin")
      {
        
    apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/downloadObjectFromBucket/${surgeonId}`;}
    if (user.role === "Super Admin") {
      apiUrl = `${process.env.REACT_APP_API_URL}/api/bucket/device/superadmin/downloadObjectFromBucket/${surgeonId}`;
    }
    const toastId = toast.loading("Preparing download...", {
      position: "top-center",
    });
      
    try {
      const response = await fetch(
        `${apiUrl}`,
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
        toast.dismiss(toastId);
        toast.error(`Failed to download ${media.key}`, {
          duration: 2000,
          position: "top-center",
        });
        throw new Error("Failed to download media.");
      }

      const { downloadUrl } = await response.json();
      toast.dismiss(toastId);
      const downloadingToastId = toast.loading("Downloading...", {
        position: "top-center",
      });
      await downloadFile(downloadUrl, downloadingToastId);
    } catch (error) {
      console.error("Error downloading media:", error);
      toast.dismiss(toastId);
      toast.error(`Error downloading ${media.key}`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const downloadFile = async (downloadUrl, downloadingToastId) => {
    try {
      const response = await fetch(downloadUrl);

      if (!response.ok) {
        toast.dismiss(downloadingToastId);
        toast.error(`Failed to download ${media.key}`, {
          duration: 2000,
          position: "top-center",
        });
        throw new Error("Failed to download file.");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", media.key);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.dismiss(downloadingToastId);
      toast.success(`${media.key} Download finished!`, {
        duration: 2000,
        position: "top-center",
      });
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.dismiss(downloadingToastId);
      toast.error(`Error downloading ${media.key}`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <button
      onClick={handleDownloadMedia}
      className="text-blue-400  bg-gray-100 hover:bg-gray-300"
    >
      <FaDownload />
    </button>
  );
};

export default DownloadBucketFile;
