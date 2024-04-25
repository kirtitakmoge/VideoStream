import React, { useState,useEffect} from 'react';
import {toast} from "react-hot-toast";
const PatientUpdate = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    firstname: '',
    password: '',
    age: '',
    gender: '',
    email: '',
    address: ''
  });

  const token = localStorage.getItem("token");
  const patientId=localStorage.getItem("id");
  useEffect(() => {
    const fetchUserData = async () => {
        try {
          
            if (!token) {
                // Handle case where token is not available
                return;
            }
            
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/getPatientById/${patientId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                     "Authorization": `Bearer ${token}` // Include the token in the Authorization header
                },
            });
            
            if (response.status === 200) {
                const formData = await response.json();
                setFormData(formData);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };
    
    fetchUserData();
}, [patientId]);

  // Function to handle form field changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("button Clicked")
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/updatePatientById/${patientId}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}` // Include the token in the Authorization header
      },
        body: JSON.stringify(formData)
      });
  
      if (response.ok) {
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
        
        console.error('Validation Error:', errorMessage);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(`Profile updation unsuccessfull `, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mx-auto">
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-center">Update Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstname" className="block font-medium">First Name</label>
            <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block font-medium">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label htmlFor="gender" className="block font-medium">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium">Address</label>
            <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full border border-gray-300 rounded px-2 py-1" required />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded w-full mt-2 hover:bg-blue-600">Update Profile</button>
        </form>
      </div>
    </div>
  );
};

export default PatientUpdate;
