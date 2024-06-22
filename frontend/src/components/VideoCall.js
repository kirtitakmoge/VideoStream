import React, { useState } from 'react';

import JitsiMeetCall from './JitsiMeetCall';
import VideoFormComponent from './VideoFormComponent';

const VideoCall = () => {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');
  const [jwt, setJwt] = useState('');
  const [isCallStarted, setIsCallStarted] = useState(false);

  const domain = 'meet.jit.si'; 

  const fetchToken = async (user, room) => {
    const response = await fetch('http://localhost:3000/get-token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: {
          name: user,
        },
        room: room,
      }),
    });
    const data = await response.json();
    return data.token;
  };

  const handleStartCall = async (room, username) => {
   // const token = await fetchToken(username, room);
   const token=localStorage.getItem("token");
    setJwt(token);
    setRoom(room);
    setUsername(username);
    setIsCallStarted(true);
  };

  return (
    <div className="h-full bg-gray-100">
      {!isCallStarted ? (
        <VideoFormComponent onStartCall={handleStartCall} />
      ) : (
        <JitsiMeetCall domain={domain} roomName={room} displayName={username} jwt={jwt} />
      )}
    </div>
  );
};

export default VideoCall;
