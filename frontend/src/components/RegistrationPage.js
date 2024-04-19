import React, { useState } from 'react';
import PatientRegistration from './PatientRegistration';
import RegistrationForm from './Register';

const RegistrationPage = () => {
  const [userType, setUserType] = useState('surgeon');

  const handleUserTypeChange = (type) => {
    setUserType(type);
  };

  return (
    <div className="flex w-full flex-col mt-0 items-center justify-center min-h-screen px-4">
      
      <div className=" mt-0 flex ">
        <button
          className={`mr-4 ${userType === 'patient' ? 'border-b-4 text-gray-500' : 'text-black'}`}
          onClick={() => handleUserTypeChange('patient')}
        >
          Patient
        </button>
        <button
          className={`${userType === 'surgeon' ? 'border-b-4 text-gray-500' : 'text-black'}`}
          onClick={() => handleUserTypeChange('surgeon')}
        >
          Surgeon
        </button>
      </div>
      <div className="max-w-xl pt-0 mt-0 w-full">
        {userType === 'surgeon' && <RegistrationForm />}
        {userType === 'patient' && <PatientRegistration />}
      </div>
    </div>
  );
};

export default RegistrationPage;
