import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PatientData = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const token = localStorage.getItem("token");
  const { departmentId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user) { // Check if user is not null
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/patient/getAllPatientByDepartmentId/${departmentId}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          setPatients(data);
          setLoading(false);
        }
      } catch (error) {
        setError('Error fetching patients');
        setLoading(false);
      }
    };

    fetchData();
  }, [user, departmentId, token]);

  if (!user) {
    return <p>Loading...</p>; // Render loading indicator if user is null
  }

  return (
    <div className="container mx-auto">
      {loading ? (
        <p>Loading...</p>
      ) : error || !patients ? (
        <p>{error}</p>
      ) : (
        <>
          <h1 className="text-2xl text-center font-bold mb-5">Patients</h1>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Firstname</th>
                <th className="px-4 py-2">Age</th>
                <th className="px-4 py-2">Gender</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Address</th>
                <th className="px-4 py-2">File</th>
                
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient._id}>
                  <td className="border px-4 py-2">{patient.firstname}</td>
                  <td className="border px-4 py-2">{patient.age}</td>
                  <td className="border px-4 py-2">{patient.gender}</td>
                  <td className="border px-4 py-2">{patient.email}</td>
                  <td className="border px-4 py-2">{patient.address}</td>
                  <td className="border px-4 py-2">
                    {patient.patientcontentId ? (
                      <ul>
                        {patient.patientcontentId.link.map((link, index) => (
                          <li key={index}>
                            <div>Object Key: {link.objectKey}</div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div>File is not shared</div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default PatientData;
