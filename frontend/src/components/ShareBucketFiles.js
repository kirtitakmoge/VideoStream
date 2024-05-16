import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const ShareBucketFile = ({ mediaFiles, departmentId ,isShare,onShare}) => {
  const [selectedFiles, setSelectedFiles] = useState(mediaFiles);
  const [patient, setPatient] = useState("");
  const [patients, setPatients] = useState([]);
  const [showOverlay, setShowOverlay] = useState(isShare); // State to control overlay visibility
  const token = localStorage.getItem("token");
  const surgeonId = localStorage.getItem("id");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch list of patients
        const patientsResponse = await fetch(
          `${process.env.REACT_APP_API_URL}/api/patient/getAllPatientByDepartmentId/${departmentId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );

        if (!patientsResponse.ok) {
          throw new Error("Failed to fetch patients");
        }

        const patientsData = await patientsResponse.json();
        console.log(patientsData);
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }

    fetchData();
  }, []);

  // Share selected files with selected user
  const handleShareFiles = async () => {
    if (selectedFiles.length === 0 || !patient) {
      toast.error("Please select media and a user.");
      return;
    }

    const selectedMediaUrls = selectedFiles.map((media) => media.url);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/patientcontent/createPatientContents`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: patient,
            surgeonId,
            link: selectedMediaUrls,
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Failed to assign media.");
      }

      toast.success(`Shared ${selectedFiles.length} media items to patient ${patient}`, {
        duration: 2000,
        position: "top-center",
      });
      console.log(`Assigned ${selectedFiles.length} media items to user ${patient}`);
    } catch (error) {
      console.log("Error sharing media:", error);

      toast.error(` ${error}`, {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       
      
      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-md m-3">
            <h3 className="text-lg font-semibold m-2">Select a Patient</h3>
            <select
              value={patient}
              onChange={(e) => setPatient(e.target.value)}
              className="border border-gray-300 px-4 py-2 rounded-md mb-5"
            >
              <option value="">Select User</option>
              {patients.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.firstname}
                </option>
              ))}
            </select>
            <div className="flex justify-end">
              <button
                onClick={() =>{ setShowOverlay(false);onShare()}}
                className="bg-red-500 text-white px-4 py-2 mr-2"
              >
                Close
              </button>
              {/* Button to share files from overlay */}
              <button
                onClick={handleShareFiles}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareBucketFile;
