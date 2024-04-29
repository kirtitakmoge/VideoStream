import React, { createContext, useContext, useState } from "react";

const HospitalContext = createContext();

export const useHospitalContext = () => useContext(HospitalContext);

export const HospitalProvider = ({ children }) => {
  const [hospitals, setHospitals] = useState([]);
  
  const fetchHospitals = async (superAdminId,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/getAllHospitals/${superAdminId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
      });
      if (response.ok) {
        const data = await response.json();
        setHospitals(data);
      } else {
        console.error("Failed to fetch hospitals");
      }
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const getHospitalById = async (adminId,hospitalId,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/getHospitalById/${adminId}/${hospitalId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error(`Failed to fetch hospital with ID ${hospitalId}`);
        return null;
      }
    } catch (error) {
      console.error(`Error fetching hospital with ID ${hospitalId}:`, error);
      return null;
    }
  };

  const deleteHospitalById = async (superAdminId,hospitalId,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/deleteHospital/${superAdminId}/${hospitalId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
      });
      if (response.ok) {
        console.log(`Hospital with ID ${hospitalId} deleted successfully`);
        fetchHospitals(superAdminId,token); // Refresh hospitals after deletion
        return true;
      } else {
        console.error(`Failed to delete hospital with ID ${hospitalId}`);
        return false;
      }
    } catch (error) {
      console.error(`Error deleting hospital with ID ${hospitalId}:`, error);
      return false;
    }
  };

  const updateHospitalById = async (superAdminId,hospitalId, updatedHospitalData,token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/hospital/updateHospitalById/${superAdminId}/${hospitalId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
             "Authorization": `Bearer ${token}` // Include the token in the Authorization header
        },
        body: JSON.stringify(updatedHospitalData),
      });
      if (response.ok) {
        console.log(`Hospital with ID ${hospitalId} updated successfully`);
        fetchHospitals(superAdminId,token); // Refresh hospitals after update
        return true;
      } else {
        console.error(`Failed to update hospital with ID ${hospitalId}`);
        return false;
      }
    } catch (error) {
      console.error(`Error updating hospital with ID ${hospitalId}:`, error);
      return false;
    }
  };

  return (
    <HospitalContext.Provider
      value={{
        hospitals,
        fetchHospitals,
        getHospitalById,
        deleteHospitalById,
        updateHospitalById,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};
