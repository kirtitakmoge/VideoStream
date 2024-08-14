import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';

const RegistrationForm = () => {
  const { hospitalId, role } = useParams();
  const navigate = useNavigate();

  const reset = {
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    hospitalId:'',
    mobile_no: '',
    departmentId: null,
    role: role || 'Surgeon', // Default role for surgeons
    profilePicture: null,
    idProof: null,
  };

  const [formData, setFormData] = useState(reset);
  const [departments, setDepartments] = useState([]);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === 'hospitalId' && value.length === 6) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/department/getAllDepartmentsByHospital_Id/${value}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const departmentsData = await response.json();
          setDepartments(departmentsData.departments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    const token = localStorage.getItem('item');
   
    const uri = `${process.env.REACT_APP_API_URL}/api/users/signup`;
    console.log(`Request URI: ${uri}`); // Verify the encoded URI
    console.log("form data",formDataToSend)
 console.log('Profile Picture:', formData.profilePicture);
console.log('ID Proof:', formData.idProof);

    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem('username', userData.user.firstname);
        localStorage.setItem('id', userData.user._id);
        localStorage.setItem('token', userData.token);
        toast.success('Thank you for Registration...', {
          duration: 2000,
          position: 'top-center',
        });
        if (userData.user.active === false) {
          navigate(`/notactive/${userData.user.firstname}`);
        }
        setFormData(reset);
      } else {
        const errorMessage = await response.text();
        toast.error(`Registration Failed: ${errorMessage}`, {
          duration: 2000,
          position: 'top-center',
        });
        setFormData(reset);
        setDepartments([]);
      }
    } catch (error) {
      console.error('Error signing up:', error.message);
      toast.error('Registration Failed', {
        duration: 2000,
        position: 'top-center',
      });
    }
  };

  return (
    <div className="container">
      <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center">User Registration</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="firstname" className="block font-medium">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastname" className="block font-medium">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">'
            
                     <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-medium">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="hospitalId" className="block font-medium">Hospital ID</label>
            <input
              type="text"
              id="hospitalId"
              name="hospitalId"
              value={formData.hospitalId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="departmentId" className="block font-medium">Department</label>
            <select
              id="departmentId"
              name="departmentId"
              value={formData.departmentId}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select Department</option>
              {departments?.map((department) => (
                <option key={department._id} value={department._id}>
                  {department.department_name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="mobile_no" className="block font-medium">Mobile Number</label>
            <input
              type="text"
              id="mobile_no"
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          {role === 'Hospital Admin' && (
            <>
              <div className="mb-4">
                <label htmlFor="profilePicture" className="block font-medium">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="idProof" className="block font-medium">ID Proof</label>
                <input
                  type="file"
                  id="idProof"
                  name="idProof"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                />
              </div>
            </>
          )}
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
