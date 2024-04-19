import React, { useState } from 'react';
import { toast } from "react-hot-toast";
const HospitalRegistrationForm = () => {
  const [formData, setFormData] = useState({
    Hospital_Name: '',
    email: '',
    phoneNumber: '',
    location: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/createHospital`, {
          method: 'Post',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          toast.success(`Hospital Registered succesfully`, {
            duration: 2000,
            position: "top-center",
          });
          
        } else {
          const errorMessage = await response.text();
          toast.error(`Hospital Registration Failed`, {
            duration: 2000,
            position: "top-center",
          });
          console.log(errorMessage)
          
          console.error('Validation Error:', errorMessage);
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        toast.error(`Profile updation unsuccessfull `, {
          duration: 2000,
          position: "top-center",
        });
      }
      setFormData({ Hospital_Name: '',
      email: '',
      phoneNumber: '',
      location: ''})
  };

  return (
    <div className="container mx-auto p-6">
      <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 py-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Hospital Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="hospitalName" className="block font-medium mb-2">Hospital Name</label>
            <input type="text" id="hospitalName" name="Hospital_Name" value={formData.Hospital_Name} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-2">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
         
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium mb-2">Phone Number</label>
            <input type="text" id="phoneNumber" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block font-medium mb-2">Location</label>
            <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default HospitalRegistrationForm;
