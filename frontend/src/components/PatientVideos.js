import React, { useState, useEffect } from 'react';

const PatientVideos = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const patientId = localStorage.getItem("id");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/PatientContent/patientcontents/${patientId}`);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setVideos(data);
        } else {
          console.error('Failed to fetch videos:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const isPhoto = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl text-center font-semibold mb-4">Patient Media</h2>
     
      {videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((url, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              {isPhoto(url.objectKey) ? (
                <img src={url.signedUrl} alt={`Photo ${index + 1}`} className="w-full h-48 object-cover" />
              ) : (
                <video controls autoPlay className="w-full h-48">
                  <source src={url.signedUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
              <h3 className="text-lg font-semibold mt-2">{isPhoto(url.objectKey) ? `Photo ${index + 1}` : `Video ${index + 1}`}</h3>
            </div>
          ))}
        </div>
      ) : (
        <div className='text-2xl text-center'>No Photo or Video is shared by the hospital</div>
      )}
    </div>
  );
};

export default PatientVideos;
