import React from 'react';

const UserDetailsModel = ({ user, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg max-w-md">
        <h2 className="text-lg font-bold">{user.firstname} {user.lastname}</h2>
        <p className="text-gray-600">{user.email}</p>
        {/* Add more user details here */}
        <div className="mt-4 flex justify-end">
          <button onClick={onDelete} className="mr-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Delete</button>
          <button onClick={onClose} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md">Close</button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModel;
