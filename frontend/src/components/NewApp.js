import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { useAuth } from "./AuthContext"; // Import the useAuth hook
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import ProfileUpdate from "./ProfileUpdate";
import SignOut from "./Signout";
import RegistrationPage from "./RegistrationPage";
import ShowVideo from "./ShowVideo";
import SubscriptionPlanPage from "./SubscriptionPlanPage";
import SubscriptionDetailsPage from "./SubscriptionDetailsPage";
import HospitalRegistrationForm from "./HospitalRegistrationForm";
import SurgeonList from "./SurgeonList";
import CameraList from "./CameraList";
import DepartmentForm from "./DepartmentForm";
import CameraForm from "./CameraForm";
import MessageComponent from "./MessageComponent";
import DeviceListAdmin from "./DeviceListAdmin";
import DepartmentDetails from "./DepartmentDetails";
import SurgeonBucket from "./SurgeonBucket";
import SurgeonDashBoard from "./SurgeonDashBoard";
import CameraMediaPage from "./CameraMediaPage";
import PatientRegistration from "./PatientRegistration";
import PatientDashboard from "./PatientDashboard";
import PatientVideos from "./PatientVideos";
import DeviceList from "./DeviceList";
import HospitalAdmin from "./Admin2";
import PatientUpdate from "./PatientUpdate";
import CreateSubScriptionPlan from "./CreateSubScriptionPlan";
import SuperAdminDashboard from "./SuperAdminDashboard";
import AllHospitals from "./AllHospital";
import HospitalAdminData from "./HospitalAdminData";
import LeftNavBar from "./leftNavBar";
import RenameDepartment from "./RenameDepartment";
import DeleteDepartment from "./DeleteDepartment";

import PatientData from "./PatientData";
import Layout from "./Layout";
const NewApp = () => {
  const { user } = useAuth(); // Get the user object from the AuthContext
 
  return (
    <Router>
      <div className="flex">
        {/* Left Navigation */}
        <div className="left-nav px-4 bg-gray-800 overflow-y-auto h-screen w-48 flex flex-col">
          {/* Logo and Name */}
          <div className="flex justify-center p-4">
            <img
              src="https://th.bing.com/th?id=OIP.jLXDXo17XAjxbpkevv2kBAHaGV&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="Taurean Surgical Logo"
              className="w-12 h-12 mr-2"
            />
            <p className="text-white text-lg font-semibold">Taurean Surgical</p>
          </div>
          {/* Navigation Links */}
        <LeftNavBar userType={user}/>
        </div>
        {/* Content */}
        <div className="w-full content flex flex-col">
          <Navbar/> <Layout>
          <Routes>
           
            <Route path="/" element={<Home />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/registration/:userType" element={<RegistrationPage />} />
          
            <Route path="/subscriptionPlan" element={<SubscriptionPlanPage />} />
            <Route path="/subscription/:id" element={<SubscriptionDetailsPage />} />
            <Route path="/hospitalRegistration" element={<HospitalRegistrationForm />} />
            <Route path="/surgeonDashboard/:departmentId" element={<SurgeonDashBoard />} />
            <Route path="/surgeonList/:departmentId" element={<SurgeonList />} />
            <Route path="/cameralist" element={<CameraList />} />{/*  for surgeon  */}
            <Route path="/deviceList" element={<DeviceList />} />{/*  for surgeon device list  */}
            <Route path="/deviceListadmin/:departmentId" element={<DeviceListAdmin />} />
            <Route path="/department-details/:departmentId/:department_name" element={<DepartmentDetails />} />
            <Route path="/showvideo/:departmentId" element={<ShowVideo />} />
            <Route path="/createCamera/:departmentId" element={<CameraForm />} />
            <Route path="/notactive/:name" element={<MessageComponent />} />
            <Route path="/hospitalAdmin" element={<HospitalAdmin />} />
            <Route path="/device/:cameraId" element={<CameraMediaPage />} />
            <Route path="/signupPatient" element={<PatientRegistration />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/renameDepartment/:departmentId" element={<RenameDepartment />} />
            <Route path="/patientvideos" element={<PatientVideos />} />
            <Route path="/device" element={<DeviceList />} />
            <Route path="/createDepartment" element={<DepartmentForm />} />
            <Route path="/deleteDepartment/:departmentId" element={<DeleteDepartment/>}/>
            <Route path="/createCamera" element={<CameraForm />} />
            <Route path="/createSubscriptionPlan" element={<CreateSubScriptionPlan />} />
            <Route path="/superAdminDashboard" element={<SuperAdminDashboard />} />
            <Route path="/surgeonBucket/:cameraId" element={<SurgeonBucket />} />
            <Route path="/patientprofileupdate" element={<PatientUpdate />} />
            <Route path="/patientData" element={<PatientData/>}/>
            <Route path="/allHospitals" element={<AllHospitals />} />
            <Route path="/hospitalAdminData/:hospitalId" element={<HospitalAdminData/>}/>
         
          </Routes>
          </Layout>
        </div>
      </div>
    </Router>
  );
};

export default NewApp;
