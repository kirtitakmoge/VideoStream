import React from "react";
import ShowVideo from "./ShowVideo";
import { Link } from "react-router-dom";
import {useAuth} from "./AuthContext"
import { useParams } from "react-router-dom";
import DeviceList from "./DeviceList";
const SurgeonDashboard = () => {
  const { departmentId } = useParams();
 const {user}=useAuth();
  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl text-center font-semibold mb-8">
      Surgeon {user.firstname} Dashboard
    </h1>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md hover:bg-slate-300">
        <Link to="/profileupdate">Surgeon Profile Update</Link>
      </div>
      <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md  hover:bg-slate-300">
        <Link to={`/cameralist/${user.departmentId}`}>Live Streaming Camera</Link>
      </div>
      <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md  hover:bg-slate-300">
        <Link to={`/deviceList/${user.departmentId}`}>Recorded Videos from Camera</Link>
      </div>
      <div className="bg-gray-100 text-xl font-bold p-6 rounded-lg shadow-md  hover:bg-slate-300">
        <Link to={`/patientData/${user.departmentId}`}>Patients</Link>
      </div>
    </div>
  </div>
  );
};

export default SurgeonDashboard;
