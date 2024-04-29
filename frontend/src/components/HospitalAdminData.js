import React, { useState, useEffect } from 'react';
import {toast} from "react-hot-toast"
import { useParams } from 'react-router-dom';
const HospitalAdminData = () => {
  const [user, setUser] = useState();
  const [isActive, setIsActive] = useState();
 const {hospitalId}=useParams();
const token=localStorage.getItem("token");
const superAdminId=localStorage.getItem("id");
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/getHospitalAdminByHospitalId/${hospitalId}/${superAdminId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setUser(data);
        console.log(data.active);
      } catch (error) {
        console.error('Error fetching hospital admins:', error);
        // Handle error
      }
    };
  
    fetchData();
  
    // Cleanup function
    return () => {
      // Any cleanup logic here
    };
  }, [hospitalId, superAdminId, token]);
  

  const handleUpdate = async () => {
    try {
      const response = await fetch( `${process.env.REACT_APP_API_URL}/api/users/updateHospitalAdminActiveStatus/${user._id}/${superAdminId}/activate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ active: isActive })
      });
      
      if (!response.ok) {
        toast.error("Failed to update Hospital Admin active status", {
          duration: 2000,
          position: 'top-center', 
      });
        throw new Error('Failed to Hospital Admin active status');
      }
      const data = await response.json();

      toast.success("Hospital Admin active status updated successfully:", {
        duration: 2000,
        position: 'top-center', 
    });
    setUser(data.user);
      console.log('Hospital Admin active status updated successfully:', data.user);
    } catch (error) {
      console.error('Error updating user active status:', error);
    }
  };

  
if(user!=null)
{
  return (
    <div className="max-w-md mx-auto mt-2 pt-0 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-center">Hospital Admin Details Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">First Name:</label>
        <p>{user.firstname}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
        <p>{user.lastname}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <p>{user.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Active</label>
        <p>{user.active?"Yes" :"No"}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Active</label>
        <input
          type="checkbox"
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
          className="mr-2"
        />
        {isActive ? 'Yes' : 'No'}
      </div>
      
      <div className="flex items-center  justify-between">
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 mx-2 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
       
      </div>
    </div>
  );}
};

export default HospitalAdminData;
