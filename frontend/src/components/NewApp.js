import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

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
import Navbar from "./Navbar";
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
import { useAuth } from "./AuthContext";

import { useEffect } from "react";
import SuperAdminDashboard from "./SuperAdminDashboard";

const NewApp = () => {
  return (
    <Router>
      <div className="flex">
        {/* Left Navigation */}
        <div className="left-nav bg-gray-800 h-screen w-48 flex flex-col">
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
          <ul className="py-4 flex flex-col items-start">
            <li className="my-2">
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            </li>
            <li className="my-2">
              <Link to="/signup" className="text-white hover:text-gray-300">
                SignUp
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/hospitalRegistration"
                className="text-white hover:text-gray-300"
              >
                Hospital Registration
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/profileupdate"
                className="text-white hover:text-gray-300"
              >
                Profile Update
              </Link>
            </li>
            <li className="my-2">
              <Link to="/signout" className="text-white hover:text-gray-300">
                Sign Out
              </Link>
            </li>
            <li className="my-2">
              <Link
                to="/subscriptionPlan"
                className="text-white hover:text-gray-300"
              >
                Subscription Plan
              </Link>
            </li>
          </ul>
        </div>
        {/* Content */}
        <div className="w-full content flex flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Home />} />

            <Route path="/profileupdate" element={<ProfileUpdate />} />

            <Route path="/signout" element={<SignOut />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/showvideo" />
            <Route
              path="/subscriptionPlan"
              element={<SubscriptionPlanPage />}
            />
            <Route
              path="/subscription/:id"
              element={<SubscriptionDetailsPage />}
            />
            <Route
              path="/hospitalRegistration"
              element={<HospitalRegistrationForm />}
            />
            <Route
              path="/surgeonDashboard/:departmentId"
              element={<SurgeonDashBoard />}
            />
            <Route
              path="/surgeonList/:departmentId"
              element={<SurgeonList />}
            />
            <Route path="/cameralist/:departmentId" element={<CameraList />} />
            <Route path="/deviceList/:departmentId" element={<DeviceList />} />
            <Route
              path="/deviceListadmin/:departmentId"
              element={<DeviceListAdmin />}
            />
            <Route
              path="/department-details/:departmentId"
              element={<DepartmentDetails />}
            />
            <Route path="/showvideo/:departmentId" element={<ShowVideo />} />
            <Route
              path="/createCamera/:departmentId"
              element={<CameraForm />}
            />

            <Route path="notactive/:name" element={<MessageComponent />} />
            <Route
              path="/hospitalAdmin/:hospitalId"
              element={<HospitalAdmin />}
            />
            <Route path="/device/:cameraId" element={<CameraMediaPage />} />
            <Route path="/signupPatient" element={<PatientRegistration />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patientvideos" element={<PatientVideos />} />
            <Route path="/device" element={<DeviceList />} />
            <Route
              path="/createSubscriptionPlan"
              element={<CreateSubScriptionPlan />}
            />
            <Route
              path="/superAdminDashboard"
              element={<SuperAdminDashboard />}
            />
            <Route
              path="/surgeonBucket/:cameraId"
              element={<SurgeonBucket />}
            />
            <Route path="/patientprofileupdate" element={<PatientUpdate />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default NewApp;
