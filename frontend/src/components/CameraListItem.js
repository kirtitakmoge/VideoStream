// CameraListItem.js
import React, { useEffect } from "react";
import Hls from "hls.js";

const CameraListItem = ({ camera }) => {
  useEffect(() => {
    const video = document.getElementById(`video-${camera.id}`);
    if (video && camera.link) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(camera.link);
        hls.attachMedia(video);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = camera.link;
      }
    }
  }, [camera]);

  return (
    <div className="bg-gray-100 h-23 mr-5 p-4 rounded-md cursor-pointer hover:bg-gray-200">
      <video id={`video-${camera.id}`} className="max-w-2xl mr-5 w-80 rounded-lg" controls autoPlay />
      <div className="text-black text-center">{camera.deviceId}</div>
    </div>
  );
};

export default CameraListItem;
