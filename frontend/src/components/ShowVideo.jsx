import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useParams } from "react-router-dom";

const ShowVideo = () => {
  const videoRefs = useRef([]);
  const [cameras, setCameras] = useState([]);
  const { departmentId } = useParams();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    console.log(departmentId);
    const fetchData = async () => {
      try {
        
        const id = localStorage.getItem("id");
        const token=localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/camera/getCamerasByDepartmentId/${departmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        console.log(data);
        setCameras(data);
        setFlag(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error: display message to user, retry, etc.
      }
    };

    fetchData();
  }, []);
//comment
  useEffect(() => {
    cameras.forEach((camera, index) => {
      const video = videoRefs.current[index];
      if (video && camera.link) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(camera.link);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = camera.link;
        }
      }
    });
  }, [cameras]);

  return (
    <div className="flex flex-row mt-5">
      {flag ? (
        cameras.map((camera, index) => (
          <div key={index} className="bg-gray-900 mx-10  rounded-lg overflow-hidden shadow-lg">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="max-w-3xl h-auto rounded-lg"
              controls
              autoPlay
            />
            <div className="text-white text-center"> {camera.streamKey}</div>
          </div>
        ))
      ) : (
        <div> Not Authorized to see any Camera stream</div>
      )}
    </div>
  );
};

export default ShowVideo;
