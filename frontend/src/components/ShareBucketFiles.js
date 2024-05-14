import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const ShareBucketFile = ({ mediaFiles,departmentId }) => {
  const [selectedFiles, setSelectedFiles] = useState(mediaFiles);
  const [patient, setPatient] = useState("");
  const [patients,setPatients] = useState([]);
  const token = localStorage.getItem("token");
  const surgeonId = localStorage.getItem("id");
 
  
useEffect(() => {
    async function fetchData() {
      try {
        // Fetch list of patients
        const patientsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/patient/getAllPatientByDepartmentId/${departmentId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Include the token in the Authorization header
          },
        });
  
        if (!patientsResponse.ok) {
          throw new Error('Failed to fetch patients');
        }
  
        const patientsData = await patientsResponse.json();
        console.log(patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    }
  
    fetchData();
  }, []); 

  // Share selected files with selected user
  const handleShareFiles = async () => {
    alert(patient);
    alert(selectedFiles.length);
    if (selectedFiles.length === 0) {
        toast.error("Please select media and enter user ID.");
        return;
    }
    
    const a = selectedFiles.map(media => media.url);
   alert(a.length);
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/patientcontent/createPatientContents`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                userId:patient,
                surgeonId,
                link: a
            }),
        });
  
        const responseData = await response.json();
  
        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to assign media.');
        }
  
        toast.success(`Shared ${selectedFiles.length} media items to patient ${patient}`, {
            duration: 2000,
            position: "top-center",
        });
  
        console.log(`Assigned ${selectedFiles.length} media items to user ${patient}`);
    } catch (error) {
        console.log('Error sharing media:', error);
       
            toast.error(` ${error}`, {
                duration: 2000,
                position: "top-center",
            });
        
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl  font-bold mb-4">Share Bucket Files</h2>
      <div className="flex justify-between mb-4">
        <select
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        >
          <option value="">Select User</option>
          {patients.map(user => (
            <option key={user._id} value={user._id}>{user.firstname}</option>
          ))}
        </select>
        <button
          onClick={handleShareFiles}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Share Files
        </button>
      </div>
    </div>
  );
};

export default ShareBucketFile;
