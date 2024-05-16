import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {toast} from "react-hot-toast"
const SurgeonData = () => {
  const {user}=useAuth();
  const { surgeonId } = useParams();
  const [isBucketActive, setIsBucketActive] = useState();
  const [isCameraActive, setIsCameraActive] = useState();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    hospitalId: "",
    specialization: "",
    mobile_no: "",
  });
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
      
        if (!token) {
          // Handle case where token is not available
          return;
        }

        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/api/users/getUserById/${surgeonId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();

          setUserData(userData);
          setIsBucketActive(userData.bucketActive);
          setIsCameraActive(userData.cameraActive);
        }
      } catch (error) {
        console.error("Error fetching userData data:", error);
      }
    };

    fetchUserData();
  }, [surgeonId]);
  const handleUpdate = async () => {
    try {
      const response = await fetch( `${process.env.REACT_APP_API_URL}/api/users/updateUserActiveStatus/${surgeonId}/activate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({  bucketActive: isBucketActive, cameraActive: isCameraActive })
      });
      
      if (!response.ok) {
        toast.error("Failed to update user active status", {
          duration: 2000,
          position: 'top-center', 
      });  
        throw new Error('Failed to update user active status');
      }
      const data = await response.json();
      setIsBucketActive(data.user.bucketActive);
      setIsCameraActive(data.user.cameraActive);
      toast.success("User active status updated successfully:", {
        duration: 2000,
        position: 'top-center', 
    });
      console.log('User active status updated successfully:', data.user);
    } catch (error) {
      console.error('Error updating user active status:', error);
    }
  };
  if(user)
  return (
    
     <>
      <div className="max-w-md self-center mt-2 pt-0 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Surgeon Details</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            First Name:
          </label>
          <p>{userData.firstname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Last Name:
          </label>
          <p>{userData.lastname}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <p>{userData.email}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Allowed to access Bucket</label>
          <p> {isBucketActive ? "Yes" : "No"}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Allowed to access Camera</label>
          <p> {isCameraActive ? "Yes" : "No"}</p>
        </div>

        {user.role === "Hospital Admin" && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Activate Bucket:
              </label>
              <input
                type="checkbox"
                checked={isBucketActive}
                onChange={() => setIsBucketActive(!isBucketActive)}
                className="mr-2"
              />
              {isBucketActive ? "Yes" : "No"}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Activate Camera:
              </label>
              <input
                type="checkbox"
                checked={isCameraActive}
                onChange={() => setIsCameraActive(!isCameraActive)}
                className="mr-2"
              />
              {isCameraActive ? "Yes" : "No"}
            </div>
            <div className="flex items-center justify-center sm:justify-end">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 mx-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleUpdate}
              >
                Update
              </button>

              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 mx-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default SurgeonData;
