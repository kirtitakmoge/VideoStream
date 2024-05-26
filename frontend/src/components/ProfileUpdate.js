import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
const UpdateProfileForm = ({ userId }) => {
  const { user, login } = useAuth();
  const initial = {
    _id: user?._id,
    firstname: user?.firstname || "",
    lastname: user?.lastname || "",
    email: user?.email || "",
    hospitalId: user?.hospitalId || "",
    departmentId: user?.departmentId || "",
    mobile_no: user?.mobile_no || "",
    role: user?.role || "",

    // Add other fields as needed
  };
  const [userData, setUserData] = useState(initial);
  useEffect(() => {
    // Update userData state when user changes (e.g., after login)
    setUserData(initial);
  }, [user]);
  if (userData === null) {
    // If user is null (not yet loaded), render a loading indicator
    return <div>Loading...</div>;
  }

  //hospitalId: user?.hospitalId?.Hospital_Name || '',
  //specialization: user?.departmentId?.department_name || '',
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
        login(data.user);
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
          {/*<div className="mb-2">
            <label htmlFor="password" className="block font-medium">Password</label>
            <input type="password" id="password" name="password" value={userData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
  </div> */}
          <div className="mb-2">
            <label htmlFor="hospitalId" className="block font-medium">
              Hospital
            </label>
            <input
              type="text"
              id="hospitalId"
              name="hospitalId"
              value={userData?.hospitalId}
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
              value={userData?.departmentId}
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
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
