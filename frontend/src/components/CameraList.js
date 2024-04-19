import React, { useEffect, useState } from "react";
import Hls from "hls.js";
import { useParams,useNavigate} from "react-router-dom";
import CameraData from "./CameraData";
const CameraList = ({  }) => {
  const {departmentId}=useParams();

  const [cameras, setCameras] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCameras() {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/camera/getCamerasByDepartmentId/${departmentId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const cameraData = await response.json();
        setCameras(cameraData);
      } catch (error) {
        console.error('Error fetching cameras:', error);
      }
    }

    fetchCameras();
  }, [departmentId]);

  const handleCameraData = (camera) => {
    setShow(false);
    setSelectedCamera(camera);
    
  }
  const handleChangeFlag=()=>
  {
    setShow((prev)=>!prev);
  }

  useEffect(() => {
    cameras.forEach((camera, index) => {
      const video = document.getElementById(`video-${index}`);
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
    <>
      {show && (
        <div className="col-span-3 mt-5">
          <h2 className="text-2xl text-center font-bold mb-4">Cameras</h2>
          <div className="flex">
            {cameras.map((camera, index) => (
              <div key={camera.id} onClick={() => handleCameraData(camera)}
                className="bg-gray-100 h-23 mr-5 p-4 rounded-md cursor-pointer hover:bg-gray-200">
                <video id={`video-${index}`} className="max-w-2xl mr-5 h-auto rounded-lg" controls autoPlay />
                <div className="text-white text-center"> {camera.streamKey}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!show && <CameraData selectedCamera={selectedCamera} handleChangeFlag={handleChangeFlag}/>}
    </>
  );
};

export default CameraList;
