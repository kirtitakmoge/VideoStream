// src/App.js
import React, { useState } from 'react';
import './App.css';
import JitsiComponent from './JitsiComponent';

function App() {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [startMeeting, setStartMeeting] = useState(false);

  const handleStartMeeting = () => {
    if (roomName && userName) {
      setStartMeeting(true);
    } else {
      alert("Please enter both room name and user name.");
    }
  };

  return (
    <div className="App w-full">
      <header className="App-header">
        <h1>React Jitsi Meet</h1>
        {!startMeeting ? (
          <div>
            <input
              type="text"
              placeholder="Enter Room Name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <button onClick={handleStartMeeting}>Start Meeting</button>
          </div>
        ) : (
          <JitsiComponent roomName={roomName} userName={userName} />
        )}
      </header>
    </div>
  );
}

export default App;
