import React from 'react';
//Camera collection data  stored in mongodb 
const CameraData = ({ selectedCamera, handleChangeFlag }) => {
  return (
    <div className="max-w-md mx-auto mt-5 pt-0 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-center">Camera Details</h2>
     
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">IP Address:</label>
        <p>{selectedCamera.ipAddress}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Device ID:</label>
        <p>{selectedCamera.deviceId}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Stream Key:</label>
        <p>{selectedCamera.streamKey}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Department Name</label>
        <p>{selectedCamera.departmentId ? selectedCamera.departmentId.department_name
 : 'N/A'}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-wrap font-bold mb-2">Link:</label>
        <p className="whitespace-pre-wrap">{selectedCamera.link}</p>
      </div>
     
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleChangeFlag}
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CameraData;
