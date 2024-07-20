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
        if (user) {
          const response = await fetch(
            `${process.env.REACT_APP_API_URL}/api/patient/getAllPatientByDepartmentId/${departmentId}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          console.log(data);
          setPatients(data);
          setLoading(false);
        }
      } catch (error) {
        setError("Error fetching patients");
        setLoading(false);
      }
    };

    fetchData();
  }, [user, departmentId, token]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <p>Loading...</p>
        </div>
      ) : error || !patients.length ? (
        <div className="flex justify-center items-center h-full">
          <p>{error || "No patients found."}</p>
        </div>
      ) : (
        <div className="container mx-auto px-4 mt-5">
          <h2 className="text-2xl font-bold mb-4 text-center">Patients Details</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr className="w-full bg-gray-800 text-white uppercase text-sm leading-normal">
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left text-sm leading-4 tracking-wider">
                    Firstname
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left text-sm leading-4 tracking-wider">
                    Age
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left text-sm leading-4 tracking-wider">
                    Gender
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left text-sm leading-4 tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left text-sm leading-4 tracking-wider">
                    Address
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-500 text-left text-sm leading-4 tracking-wider">
                    File
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm ">
                {patients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-left whitespace-nowrap">
                      {patient.firstname}
                    </td>
                    <td className="py-3 px-4 text-left">{patient.age}</td>
                    <td className="py-3 px-4 text-left">{patient.gender}</td>
                    <td className="py-3 px-4 text-left">{patient.email}</td>
                    <td className="py-3 px-4 text-left">{patient.address}</td>
                    <td className="py-3 px-4 text-left">
                      {patient.patientcontentId ? (
                        <ul className="list-disc ml-4">
                          {patient.patientcontentId.link.map((link, index) => (
                            <li key={index} className="truncate">
                              {link.objectKey}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="list-disc ml-4">File is not shared</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientData;
