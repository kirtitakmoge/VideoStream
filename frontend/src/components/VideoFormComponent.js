import React, { useState } from 'react';

const VideoFormComponent = ({ onStartCall }) => {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  const handleStartCall = () => {
    onStartCall(room, username);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h2 className="text-2xl font-bold mb-6">Start Video Call</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Room Name</label>
          <input
            type="text"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          onClick={handleStartCall}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Start Call
        </button>
      </div>
    </div>
  );
};

export default VideoFormComponent;
