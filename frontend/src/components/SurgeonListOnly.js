// SurgeonList.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SurgeonData from './SurgeonData';
import UserComponent from './UserComponent';
const SurgeonListOnly = () => {
    const { departmentId } = useParams();
    const [surgeons, setSurgeons] = useState([]);
    const [selectedsurgeon, setSelectedSurgeon] = useState([]);
    const [show,setShow]=useState(true);
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
        setShow(false);
        setSelectedSurgeon(surgeon);
    }
    const handleChangeFlag=()=>
    {
      setShow((prev)=>!prev);
    }
    return (<>
  {show && (
      <div className="container m-5">
        
        <h1 className="text-2xl text-center font-bold mb-4">Surgeons</h1>
        <div className="grid grid-cols-3 gap-4">
          {surgeons.map(surgeon => (
            <div key={surgeon._id} onClick={()=>handleSurgeon(surgeon)} className="bg-white p-4 rounded shadow">
              <h2 className="text-xl font-bold mb-2">{surgeon.firstname} {surgeon.lastname}</h2>
              <p className="text-gray-600">{surgeon.email}</p>
              {/* Render other surgeon details here */}
            </div>
          ))}
        </div>
      </div>)}
  
      {!show && <UserComponent user={selectedsurgeon} handleChangeFlag={handleChangeFlag}/>}
      </>
    );
  };
  

export default SurgeonListOnly;
