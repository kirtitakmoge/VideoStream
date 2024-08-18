import React, { useState, useEffect } from 'react';
import { useAuth } from "./AuthContext";

const HospitalDepartmentSelector = ({ onSelection }) => {
  const [selectedHospital, setSelectedHospital] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [showOverlay, setShowOverlay] = useState(true);
  const { user } = useAuth();
  const hospitals = user?.hospitals || [];

  // useEffect(() => {
  //   if (hospitals?.length === 1) {
  //     const singleHospital = hospitals[0];
  //     setSelectedHospital(singleHospital?.hospitalId);

  //     if (singleHospital?.departmentId.length === 1) {
  //       setSelectedDepartment(singleHospital?.departmentId[0]._id);
  //       setShowOverlay(false);
  //       onSelection(singleHospital?.hospitalId, singleHospital?.departmentId[0]._id);
  //     }
  //   }
  // }, [hospitals, onSelection]);

  const handleHospitalChange = (event) => {
    const selectedHospitalId = event.target.value;
    setSelectedHospital(selectedHospitalId);
    setSelectedDepartment('');
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleSubmit = () => {
    onSelection(selectedHospital, selectedDepartment);
    setShowOverlay(false);
  };

  if (!showOverlay) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-xl font-semibold mb-4">Select Hospital and Department</h2>
        
        {/* Hospital selection dropdown */}
        <label className="block text-gray-700 mb-2">Hospital:</label>
        <select 
          value={selectedHospital} 
          onChange={handleHospitalChange} 
          className="block w-full p-2 mb-4 border rounded"
        >
          <option value="">Select a hospital</option>
          {hospitals.map((hospital, index) => (
            <option key={index} value={hospital?.hospitalId}>
              {hospital?.Hospital_Name} (ID: {hospital?.hospitalId})
            </option>
          ))}
        </select>
        
        {/* Department selection dropdown */}
        {selectedHospital && (
          <>
            <label className="block text-gray-700 mb-2">Department:</label>
            <select 
              value={selectedDepartment} 
              onChange={handleDepartmentChange} 
              className="block w-full p-2 mb-4 border rounded"
            >
              <option value="">Select a department</option>
              {hospitals
                .find((hospital) => hospital.hospitalId === selectedHospital)
                .departmentId.map((dept, index) => (
                  <option key={index} value={dept._id}>
                    {dept.name} (ID: {dept._id})
                  </option>
                ))}
            </select>
          </>
        )}
        
        {/* Submit button */}
        <button 
          onClick={handleSubmit} 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={!selectedDepartment}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default HospitalDepartmentSelector;
