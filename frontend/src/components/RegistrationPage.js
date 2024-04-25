import React, { useState } from 'react';
import PatientRegistration from './PatientRegistration';
import RegistrationForm from './Register';
import {useParams} from "react-router-dom"
const RegistrationPage = () => {

 const {userType} =useParams();
  return (
    <div className="flex w-full flex-col mt-0 items-center justify-center min-h-screen px-4">
      
      
      <div className="max-w-xl pt-0 mt-0 w-full">
        {userType === 'Surgeon' && <RegistrationForm />}
        {userType === 'Patient' && <PatientRegistration />}
      </div>
    </div>
  );
};
export default RegistrationPage;
