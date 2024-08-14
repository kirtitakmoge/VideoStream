import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const UpdateProfileForm = () => {
  const { user, login } = useAuth();
  const [userData, setUserData] = useState({
    _id: "",
    firstname: "",
    lastname: "",
    email: "",
    hospitals: [], // Array of hospital objects
    mobile_no: "",
    role: "",
  });

  useEffect(() => {
    if (user) {
      // Convert user data to fit the form structure
      setUserData({
        _id: user._id || "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        hospitals: user.hospitals.map(hospital => ({
          hospitalId: hospital.hospitalId || "",
          hospitalName: hospital.hospitalId.Hospital_Name || "", // Ensure you have the hospital name
          departmentId: hospital.departmentId.map(dept => ({
            deptId: dept._id || "",
            deptName: dept.department_name || "", // Ensure you have the department name
          })) || [],
        })) || [],
        mobile_no: user.mobile_no || "",
        role: user.role || "",
      });
    }
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const token = localStorage.getItem("token");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleHospitalChange = (e, index) => {
    const updatedHospitals = [...userData.hospitals];
    updatedHospitals[index] = {
      ...updatedHospitals[index],
      hospitalName: e.target.value, // Update hospital name
    };
    setUserData({ ...userData, hospitals: updatedHospitals });
  };

  const handleDepartmentChange = (e, hospitalIndex, deptIndex) => {
    const updatedHospitals = [...userData.hospitals];
    const updatedDepartments = [...updatedHospitals[hospitalIndex].departmentId];
    updatedDepartments[deptIndex] = {
      ...updatedDepartments[deptIndex],
      deptName: e.target.value, // Update department name
    };
    updatedHospitals[hospitalIndex] = {
      ...updatedHospitals[hospitalIndex],
      departmentId: updatedDepartments,
    };
    setUserData({ ...userData, hospitals: updatedHospitals });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Filter out empty department objects
    const sanitizedHospitals = userData.hospitals.map(hospital => ({
      hospitalId: hospital.hospitalId,
      departmentId: hospital.departmentId.map(dept => dept.deptId), // Remove empty department names and include ids
    }));
  console.log(sanitizedHospitals)
    const dataToSend = { ...userData, hospitals: sanitizedHospitals };
  console.log(dataToSend)
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/users/updateUserById/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dataToSend),
        }
      );
  
      if (response.ok) {
        const data = await response.json();
        toast.success(`Profile Updated Successfully`, {
          duration: 2000,
          position: "top-center",
        });
        login(data.user);
      } else {
        const errorMessage = await response.text();
        toast.error(`Profile update unsuccessful: ${errorMessage}`, {
          duration: 2000,
          position: "top-center",
        });
        console.error("Validation Error:", errorMessage);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(`Profile update unsuccessful`, {
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
              value={userData.firstname}
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
              value={userData.lastname}
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
              value={userData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          {userData.hospitals.map((hospital, hospitalIndex) => (
            <div key={hospitalIndex} className="mb-2">
              <label htmlFor={`hospital_${hospitalIndex}`} className="block font-medium">
                Hospital
              </label>
              <input
                type="text"
                id={`hospital_${hospitalIndex}`}
                name="hospitalName"
                value={hospital.hospitalName}
                onChange={(e) => handleHospitalChange(e, hospitalIndex)}
                className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
              />
              {hospital.departmentId.map((dept, deptIndex) => (
                <div key={deptIndex} className="mb-2">
                  <label htmlFor={`department_${hospitalIndex}_${deptIndex}`} className="block font-medium">
                    Department
                  </label>
                  <input
                    type="text"
                    id={`department_${hospitalIndex}_${deptIndex}`}
                    name="deptName"
                    value={dept.deptName}
                    onChange={(e) => handleDepartmentChange(e, hospitalIndex, deptIndex)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                  />
                </div>
              ))}
              
            </div>
          ))}
         
          <div className="mb-2">
            <label htmlFor="mobile_no" className="block font-medium">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile_no"
              name="mobile_no"
              value={userData.mobile_no}
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
              value={userData.role}
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

export default UpdateProfileForm;
