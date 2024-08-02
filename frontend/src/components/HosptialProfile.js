import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';

const HospitalProfile = () => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  
  const [hospitalData, setHospitalData] = useState({
    hospital_Id: '',
    Hospital_Name: '',
    location: '',
    email: '',
    phoneNumber: '',
  });

  const [loading, setLoading] = useState(false);
  const superAdminId=localStorage.getItem("id");
      const token=localStorage.getItem("token");
  // Fetch hospital data when component mounts
  useEffect(() => {
    const fetchHospitalData = async () => {
      setLoading(true);
    
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/getHospitalById/${superAdminId}/${hospitalId}`,
          { headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        }});
        if (response.ok) {
          const data = await response.json();
          setHospitalData(data);
        } else {
          toast.error('Failed to fetch hospital data');
        }
      } catch (error) {
        console.error('Error fetching hospital data:', error);
        toast.error('Failed to fetch hospital data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchHospitalData();
  }, [hospitalId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHospitalData({ ...hospitalData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/updateHospitalById/${superAdminId}/${hospitalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(hospitalData),
      });

      if (response.ok) {
        toast.success('Hospital data updated successfully');
        navigate('/hospitals'); // Redirect to hospitals list or any other page
      } else {
        const errorMessage = await response.text();
        toast.error(`Update failed: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error updating hospital data:', error);
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-bold text-center">Update Hospital</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="hospital_Id" className="block font-medium">Hospital ID</label>
            <input
              type="text"
              id="hospital_Id"
              name="hospital_Id"
              value={hospitalData.hospital_Id}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="Hospital_Name" className="block font-medium">Hospital Name</label>
            <input
              type="text"
              id="Hospital_Name"
              name="Hospital_Name"
              value={hospitalData.Hospital_Name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block font-medium">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={hospitalData.location}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={hospitalData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={hospitalData.phoneNumber}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full">
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default HospitalProfile;
