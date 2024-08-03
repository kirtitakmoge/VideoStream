import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
const SurgeonUpdate = () => {
    const {surgeonId}=useParams();
  const initial = {
    _id: "",
    firstname:"",
    lastname: "",
    email:  "",
    hospitalId:  "",
    departmentId:  "",
    mobile_no:  "",
    role: "",

    // Add other fields as needed
  };
  const [userData, setUserData] = useState(initial);
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
          console.log(userData);
          setUserData(userData);
          
        }
      } catch (error) {
        console.error("Error fetching userData data:", error);
      }
    };

    fetchUserData();
  }, [surgeonId]);
  if (userData === null) {
    // If user is null (not yet loaded), render a loading indicator
    return <div>Loading...</div>;
  }

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button Clicked");
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/updateUserById/${userData?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(`Profile Updated SuccessFully`, {
          duration: 2000,
          position: "top-center",
        });
       
      } else {
        const errorMessage = await response.text();
        toast.error(`Profile updation unsuccessfull  ${errorMessage}`, {
          duration: 2000,
          position: "top-center",
        });

        console.error("Validation Error:", errorMessage);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(`Profile updation unsuccessfull `, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-xl mx-auto p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl text-center font-bold mb-2">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="firstname" className="block font-medium">
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={userData?.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="lastname" className="block font-medium">
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={userData?.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData?.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
       
          <div className="mb-2">
            <label htmlFor="hospitalId" className="block font-medium">
              Hospital
            </label>
            <input
              type="text"
              id="hospitalId"
              name="hospitalId"
              value={userData?.hospitalId?.Hospital_Name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="specialization" className="block font-medium">
              Specialization
            </label>
            <input
              type="text"
              id="specialization"
              name="departmentId"
              value={userData?.departmentId?.department_name || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="mobile_no" className="block font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile_no"
              name="mobile_no"
              value={userData?.mobile_no}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="block font-medium">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={userData?.role}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurgeonUpdate;
