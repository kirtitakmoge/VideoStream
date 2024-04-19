import React, { useState, useEffect } from 'react';

const SurgeonData = ({ selectedUser, handleChangeFlag, onDelete, onUpdate }) => {
  const [user, setUser] = useState(selectedUser);
  const [isActive, setIsActive] = useState(selectedUser.active);
  const [isBucketActive, setIsBucketActive] = useState(selectedUser.bucketActive);
  const [isCameraActive, setIsCameraActive] = useState(selectedUser.cameraActive);

  useEffect(() => {
    setUser(selectedUser);
   
    setIsBucketActive(selectedUser.bucketActive);
    setIsCameraActive(selectedUser.cameraActive);
  }, [selectedUser]);

  const handleBack = () => {
    handleChangeFlag();
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch( `${process.env.REACT_APP_API_URL}/api/users/updateUserActiveStatus/${selectedUser._id}/activate`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({  bucketActive: isBucketActive, cameraActive: isCameraActive })
      });
      if (!response.ok) {
        throw new Error('Failed to update user active status');
      }
      const data = await response.json();
      console.log('User active status updated successfully:', data.user);
    } catch (error) {
      console.error('Error updating user active status:', error);
    }
  };

  const handleDelete = () => {
    onDelete(user.id);
  };

  return (
    <div className="max-w-md mx-auto mt-2 pt-0 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-bold mb-4 text-center">Surgeon Details</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">First Name:</label>
        <p>{user.firstname}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
        <p>{user.lastname}</p>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Email:</label>
        <p>{user.email}</p>
      </div>
     
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Activate Bucket:</label>
        <input
          type="checkbox"
          checked={isBucketActive}
          onChange={() => setIsBucketActive(!isBucketActive)}
          className="mr-2"
        />
        {isBucketActive ? 'Yes' : 'No'}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Activate Camera:</label>
        <input
          type="checkbox"
          checked={isCameraActive}
          onChange={() => setIsCameraActive(!isCameraActive)}
          className="mr-2"
        />
        {isCameraActive ? 'Yes' : 'No'}
      </div>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleBack}
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Back
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default SurgeonData;
