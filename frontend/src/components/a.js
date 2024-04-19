import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { useParams } from "react-router-dom";

const HLSPlayer = () => {
  const videoRefs = useRef([]);
  const [cameras, setCameras] = useState([]);
  const { departmentId } = useParams();
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const id = localStorage.getItem("id");
        const response = await fetch(
          `http://localhost:8081/api/camera/getCamerasByDepartmentId/${departmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
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

  useEffect(() => {
    cameras.forEach((camera, index) => {
      const video = videoRefs.current[index];
      if (video && camera.url) {
        if (Hls.isSupported()) {
          const hls = new Hls();
          hls.loadSource(camera.url);
          hls.attachMedia(video);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
          video.src = camera.url;
        }
      }
    });
  }, [cameras]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      {flag ? (
        cameras.map((camera, index) => (
          <div key={index} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              className="max-w-3xl h-auto rounded-lg"
              controls
              autoPlay
            />
          </div>
        ))
      ) : (
        <div> Not Authorized to see any Camera stream</div>
      )}
    </div>
  );
};

export default HLSPlayer;



const assignMediaToUser = async () => {
  if (selectedMedia.length === 0 || !userId) {
    alert("Please select media and enter user ID.");
    return;
  }
const a=selectedMedia.map((item)=>item.url);
console.log(a);
  try {
    const response = await fetch('http://localhost:8081/api/patientcontent/patientContents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
      
        surgeonId:localStorage.getItem("id"),
        link:a
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to assign media.');
    }

    // Clear selected media and user ID after successful assignment
    setSelectedMedia([]);
    setUserId("");
    setShowUserIdInput(false);
    
    alert(`Assigned ${selectedMedia.length} media items to user ${userId}`);
  } catch (error) {
    console.error('Error assigning media:', error);
    alert('Failed to assign media. Please try again.');
  }
};


  // Function to handle deletion of media
  const handleDeleteMedia = async (media) => {
    if (media.length === 0) {
      return;
    }
    try {
      const response = await fetch('http://localhost:8081/api/bucket/device/deleteObjectFromBucket/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cameraId,
          objectKey: media.key,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete media.');
      }
      alert(`Deleted ${media.key} media items`);
      // Clear selected media after successful deletion
      setSelectedMedia([]);

     
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media. Please try again.');
    }
  };// DepartmentDetails.js

  import React, { useEffect, useRef, useState } from "react";
  import Hls from "hls.js";
  import { useParams,useNavigate } from "react-router-dom";
  
  import UserForm from './SurgeonData';
  import CameraForm from './CameraData';
  import CameraList from "./CameraList";
  import DeviceList from "./DeviceList";
  
  const DepartmentDetails = () => {
    const videoRefs = useRef([]);
    const [users, setUsers] = useState([]);
    const [cameras, setCameras] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedCamera, setSelectedCamera] = useState(null);
    const { departmentId } = useParams();
    const navigate = useNavigate();
    const[flag,setFlag]=useState(false);
    useEffect(() => {
      async function fetchData(departmentId) {
        try {
          if (departmentId) {
            const [usersResponse, camerasResponse] = await Promise.all([
              fetch(`http://localhost:8081/api/users/getUsersByDepartmentId/${departmentId}`),
              fetch(`http://localhost:8081/api/camera/getCamerasByDepartmentId/${departmentId}`)
            ]);
            if (!usersResponse.ok || !camerasResponse.ok) {
              throw new Error('Network response was not ok');
            }
            const usersData = await usersResponse.json();
            const camerasData = await camerasResponse.json();
            setUsers(usersData);
            setCameras(camerasData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      
      fetchData(departmentId);
    }, [departmentId]);
  
    const handleChangeFlag=()=>
    {
      setFlag((prev)=>!prev);
    }
    const handleUserClick = (user) => {
      console.log(user);
      setSelectedUser(user);
      setSelectedCamera(null);
      setFlag(true);
    };
    const handleCameraClick = (camera) => {
      console.log(camera);
      setSelectedCamera(camera);
     setSelectedUser(null);
      setFlag(true);
    };
    const handleDeviceClick=(camera)=>
    {
      navigate(`/device/${camera._id}`);
    }
  
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
      <div className="container mx-auto px-4 py-8">{!flag &&
        <div className="grid grid-cols-3 gap-8">
          {/* User Section */}
          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4">Users</h2>
            <div className="grid grid-cols-3 gap-4">
              {users.map(user => (
                <div key={user.id} className="bg-gray-100 p-4 rounded-md cursor-pointer hover:bg-gray-200" onClick={() => handleUserClick(user)}>
                  <p className="text-lg font-semibold">{user.firstname} {user.lastname}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Camera Section */}
          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4">Cameras</h2>
            <div className="flex">
           { cameras.map((camera, index) => (
            <div key={camera.id} className="bg-gray-100 h-23 mr-5 p-4 rounded-md cursor-pointer hover:bg-gray-200" onClick={() => handleCameraClick(camera)}>
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="max-w-2xl mr-5 h-auto rounded-lg"
                controls
                autoPlay
              />
              <div className="text-white text-center"> {camera.streamKey}</div>
            </div>
          ))}
        
  <p>CameraList</p>
        <CameraList departmentId={departmentId}/>
        
        <DeviceList departmentId={departmentId}/>  
            
            </div>
          </div>
          <div className="col-span-3">
            <h2 className="text-2xl font-bold mb-4">Devices</h2>
            <div className="grid grid-cols-3 gap-4">
           { cameras.map((camera, index) => (
            <div key={camera.id} className="bg-gray-200 h-23  p-4 rounded-md cursor-pointer hover:bg-gray-200" onClick={() => handleDeviceClick(camera)}>
             
              <div className="text-black text-center"> {camera.deviceId}</div>
            </div>
          ))}
        
        
            
           
            </div>
          </div>
        </div>
              }
        {selectedUser &&  flag && (
          <div className="mt-8">
         
           <UserForm selectedUser={selectedUser} handleChangeFlag={handleChangeFlag}/>
          </div>
        )}
         {selectedCamera &&  flag && (
          <div className="mt-8">
         
           <CameraForm selectedCamera={selectedCamera} handleChangeFlag={handleChangeFlag}/>
          </div>
        )}
      </div>
    );
    
  
  };
  
  export default DepartmentDetails;
  
  
  
  
  
  
  
  
  <div className="bg-gray-100 min-h-screen">
  {/* Navigation Bar */}
  <p className='text-2xl text-center text-black-500'> Patient</p>
  <div className='flex mt-4 flex-wrap'>
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
      <Link
        className="inline-block align-baseline text-center font-bold text-xl text-Black-500 hover:text-blue-800"
        to="/profileupdate"
      >
       Surgeons 
      </Link>
      </div>
    </div>
  
  
    <Link to="/patientvideos" className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
  <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
  <h2 className="text-xl font-semibold mb-4">Live Streaming Cameras</h2>
  {/* Add content for appointments section here */}
  </div>
  </Link>
  
  
    {/* Settings Section */}
    <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-4">
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col h-full">
        <h2 className="text-xl font-semibold mb-4">Recored Videos and photo Fro</h2>
        {/* Add content for settings section here */}
      </div>
    </div>
  </div>
  </div>