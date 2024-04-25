import React from 'react';
import { useParams } from 'react-router-dom';
const MessageComponent = () => { 
    const {name} = useParams();
  return (
    <div className="container mt-5 mx-auto">
      <div className="max-w-md mx-auto mt-2 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-center"></h2>
        <div className="space-y-4">
       
         <p> Thank you for registering. Your account activation is under process.</p>
         <p> Please wait</p>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
