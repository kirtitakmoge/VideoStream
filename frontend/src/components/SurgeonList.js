// SurgeonList.js

import React, { useState, useEffect } from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import SurgeonData from './SurgeonData';
const SurgeonList = () => {
  const navigate=useNavigate();
  const { departmentId } = useParams();
  const [surgeons, setSurgeons] = useState([]);
 
  useEffect(() => {
   
    // Fetch surgeons when component mounts
    fetchSurgeons();
  }, []);

  const fetchSurgeons = async () => {
    const token=localStorage.getItem("token");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/getUsersByDepartmentId/${departmentId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
    });
      if (!response.ok) {
        throw new Error('Failed to fetch surgeons');
      }
      const data = await response.json();
      setSurgeons(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSurgeon=(surgeon)=>
  {
    navigate(`/surgeonData/${surgeon._id}`);
  }
 
  return (<>
{( <div className="container mx-auto px-4 py-5">
      <h1 className="text-2xl font-bold text-center mb-4">Surgeons</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {surgeons.map(surgeon => (
          (surgeon.role !== "Hospital Admin" && surgeon.role !== "Super Admin") &&
          <div key={surgeon._id} onClick={() => handleSurgeon(surgeon)} className="bg-white p-4 rounded shadow cursor-pointer">
            <h2 className="text-lg font-bold mb-2">{surgeon.firstname} {surgeon.lastname}</h2>
            <p className="text-gray-600">{surgeon.email}</p>
            {/* Render other surgeon details here */}
          </div>
        ))}
      </div>
    </div>)}

   
    </>
  );
};

export default SurgeonList;
