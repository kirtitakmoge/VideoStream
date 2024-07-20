import React, { useState } from 'react';
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const reset = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    mobile_no: '',
  };
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState(reset);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const token = localStorage.getItem("item");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      if(response.ok) {
        const userData = await response.json();
        toast.success(`Thank you For Registration...`, {
          duration: 2000,
          position: "top-center",
        });
        setFormData(reset);
      } else {
        const errorMessage = await response.text();
        console.log(errorMessage)
        toast.error(`Registration Failed ${errorMessage}`, {
          duration: 2000,
          position: "top-center",
        });
        setFormData(reset);
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error(`Registration Failed`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <section className="py-8">
      <div className="container mx-auto shadow-lg rounded-lg px-8">
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8">
          {/* Form section */}
          <div className="max-w-md w-full text-gray-400 p-6  mb-4">
            <h2 className="text-xl font-bold mb-4 text-center">User Registration</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstname" className="block font-medium">First Name</label>
                <input type="text" id="firstname" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="lastname" className="block font-medium">Last Name</label>
                <input type="text" id="lastname" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-medium">Email</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-medium">Password</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>
              <div className="mb-4">
                <label htmlFor="mobile_no" className="block font-medium">Mobile Number</label>
                <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleChange} className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full">Register</button>
            </form>
          </div>
          
          {/* Image section */}
          <div className="max-w-md w-full text-gray-400 p-6  mb-4 hidden sm:block">
            <div className="relative h-80 rounded-lg overflow-hidden">
              <img
                className="absolute inset-0 w-full h-full object-cover"
                src="https://th.bing.com/th/id/OIP.gIfCCCDqYKsYQ7gonoiJYAHaE7?rs=1&pid=ImgDetMain"
                alt="Placeholder"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
