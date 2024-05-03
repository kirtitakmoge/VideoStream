import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
const PatientVideos = () => {
  const [videos, setVideos] = useState([]);
 const {user}=useAuth();
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const patientId = localStorage.getItem("id");
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/PatientContent/patientcontents/${patientId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setVideos(data);
        } else {
          console.error("Failed to fetch videos:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const isPhoto = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

 
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-4">
        Patient {user.firstname} Media
      </h2>
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((innerArray, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              {innerArray.map((media, mediaIndex) => (
                <div key={mediaIndex} className="m-5">
                  {isPhoto(media.objectKey) ? (
                    <img
                      src={media.presignedUrl}
                      alt={`Photo ${mediaIndex + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video
                      controls
                      className="object-cover w-full h-48"
                    >
                      <source
                        src={media.presignedUrl}
                        type="video/mp4"
                      />
                      Your browser does not support the video tag.
                    </video>
                  )}
                  <h3 className="text-lg font-semibold mt-2">
                    Media {mediaIndex + 1}
                  </h3>
                  <p>{`Shared By Surgeon ${media.surgeonName}`}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-2xl text-center">
          No media shared by the hospital
        </div>
      )}
    </div>
  );
};

export default PatientVideos;
