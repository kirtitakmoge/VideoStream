import  { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DepartmentDetailsSuper from './DepartmentDetailsSuper';
import {  FaHome, FaUser, FaHospital, FaVideo } from 'react-icons/fa';
import React, { useMemo} from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { useAuth } from "./AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
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
import PatientUpdate from "./PatientUpdate";
import CreateSubScriptionPlan from "./CreateSubScriptionPlan";
import SuperAdminDashboard from "./SuperAdminDashboard";
import AllHospitals from "./AllHospital";
import HospitalAdminData from "./HospitalAdminData";
import RenameDepartment from "./RenameDepartment";
import DeleteDepartment from "./DeleteDepartment";
import PatientData from "./PatientData";
import DepartmentGallerySuper from "./DepartmentGallerySuper";

import SurgeonListOnly from "./SurgeonListOnly";
import CameraBucket from "./CameraBucket";
import HospitalAdmin from "./HospitalAdmin";
import UpdateCamera from "./UpdateCamera";
import CameraData from "./CameraData";
import SurgeonData from "./SurgeonData";
import SuperAllCamera from "./SuperAllCamera";
import ViewBucketFiles from "./ViewBucketFiles";
import ResetPassword from "./ResetPassword";
import VideoCall from "./VideoCall";
import Layout from './Layout';
import HospitalProfile from './HosptialProfile';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user, isLoggedIn } = useAuth();
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
const LeftNavBar = () => {
  const { user } = useAuth();

  const navLinks = useMemo(() => {
    
    return (
      <ul>{user==null?(
      <>
          
          <li>
            <Link to="/login/Patient">Patient Login</Link>
          </li>
          <li>
            <Link to="/registration/Patient">Patient Registration</Link>
          </li>
       
          <li>
            <Link to="/registration/Surgeon">Surgeon Registration</Link>
          </li>
        
       
          <li>
            <Link to="/login/Surgeon">Surgeon Login</Link>
          </li>
          
          </>
      ):(<>
        
        {user.role === "Patient" && (<>
          <li>
            <Link to="/patient">Patient Dashboard</Link>
          </li>
          <li>
             <Link to="/patientvideos">Shared Surgery Videos by Surgeon</Link>
          </li>
          <Link to="/signout">Signout</Link></>
        )}
        {user.role === "Surgeon" && (
          <>
            <li>
              <Link to={`/surgeonDashboard/${user.departmentId}`}>
                Surgeon Dashboard
              </Link>
            </li>
            <li>
              <Link to="/profileupdate">Profile Update</Link>
            </li>
            <li>
              <Link to="/cameralist">Camera</Link>
            </li>
            <li>
              <Link to="/devicelist">Devices</Link>
            </li>
            <li>
          <Link to="/signout">Signout</Link>
        </li>
          </>
        )}
        {user.role === "Hospital Admin" && (
          <>
            <li>
              <Link to="/hospitalAdmin">Hospital Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/profileupdate">Profile Update</Link>
            </li>
            <li>
              <Link to="/createDepartment">Create Department</Link>
            </li>
            <li>
          <Link to="/signout">Signout</Link>
        </li>
          </>
        )}

{user.role === "Super Admin" && (
          <>
            <li>
              <Link to="/superAdminDashboard">Super Admin Dashboard</Link>
            </li>
            <li>
              <Link to="/profileupdate">Profile Update</Link>
            </li>
            <li>
              <Link to="/allHospitals">Hospitals</Link>
            </li>
            <li>
            <Link to="/allHospitals">Activate Hospital Admin</Link>
            </li>
            <li>
          <Link to="/signout">Signout</Link>
        </li>
          </>
        )}
      </> ) }
      </ul>
    );
  }, [user]);

  return <nav>{navLinks}</nav>;
};


  const Navbar = ({ username }) => {
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isSettingsDropdownOpen, setIsSettingsDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null);
    const settingsDropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
          setIsProfileDropdownOpen(false);
        }
        if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
          setIsSettingsDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const toggleProfileDropdown = () => {
      setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    const toggleSettingsDropdown = () => {
      setIsSettingsDropdownOpen(!isSettingsDropdownOpen);
    };
 const handleClick=()=>
 {
  setIsSettingsDropdownOpen(false);
 }
    const handleProfileUpdateClick = () => {
      setIsProfileDropdownOpen(false);
      // Implement navigation or state update for profile update
    };

    const handleSignoutClick = () => {
      setIsProfileDropdownOpen(false);
      // Implement signout logic
    };

    const UserIcon = ({ username }) => {
      const initials = username ? username.charAt(0).toUpperCase() : '';

      return (
        <div className="rounded-full h-8 w-8 bg-red-500 flex items-center justify-center text-gray-600">
          {initials}
        </div>
      );
    };

    return (
      <nav className={`  "bg-gray-700 text-white"`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">
          {/* Hamburger menu for mobile */}
          {user && <div className="lg:hidden ">
            <button
              className="text-black-500 p-2 focus:outline-none "
              onClick={toggleSidebar}
            >
              {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>}

          {/* Branding/logo */}
          <Link to="/" className="text-lg font-semibold">SurgiCloud</Link>

          {/* User dropdown and menu */}
          <div className="flex items-center">
            {/* Profile dropdown */}
            { user &&
            <div className="relative ml-4">
              <div className="flex items-center cursor-pointer" onClick={toggleProfileDropdown}>
               
                <UserIcon username={username} />
                <span className="ml-2">{username}</span>
              </div>
              {isProfileDropdownOpen && (
                <div ref={profileDropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <Link to="/profileupdate"
                      onClick={handleProfileUpdateClick}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      Profile Update
                    </Link>
                    <Link
                      to="/signout"
                      onClick={handleSignoutClick}
                      className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer"
                    >
                      Signout
                    </Link>
                    
                  </div>
                </div>
              )}
            </div>}

            {/* Settings dropdown */}
            <div className="relative ml-4">
      <button
        className="flex items-center text-black p-2 focus:outline-none"
        onClick={toggleSettingsDropdown}
      >
        Login
        <span className=" mt-1">
          <MdOutlineArrowDropDown />
        </span>
      </button>
    
              {isSettingsDropdownOpen && (
                <div ref={settingsDropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                  <div className="py-1">
                  <Link to="/registration/Surgeon" onClick={handleClick} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer">Surgeon Registration</Link>
                  <Link to="/login/Surgeon" onClick={handleClick} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer">Surgeon Login</Link>
                    <Link to="/registration/Patient"  onClick={handleClick} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer">Patient Registration</Link>
                    <Link to="/login/Patient"  onClick={handleClick} className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 w-full text-left cursor-pointer">Patient Login</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  };

  return (
    <Router>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
       { user &&<div
      ref={sidebarRef}
      className={`bg-gray-700 text-white w-48 min-h-screen fixed left-0 top-0 overflow-y-auto transition-transform duration-300 ease-in-out transform z-50 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:relative lg:flex lg:flex-col lg:justify-start lg:shadow-lg`}
    >
          <div className="p-4 flex items-center justify-between">
          <img
            src="https://th.bing.com/th?id=OIP.jLXDXo17XAjxbpkevv2kBAHaGV&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
            alt="Taurean Surgical Logo"
            className="w-12 h-12 rounded-full mr-2"
          />
            <p className="text-lg font-semibold">Surgi Cloud</p>
          </div>
         <LeftNavBar/>
        </div>}

        {/* Content area */}
        <div className="flex flex-col w-full">
          {/* Top navigation */}
          <Navbar username={localStorage.getItem('username')} />

          {/* Main content */}
          <div className={` flex-grow overflow-y-auto ${isLoggedIn ? "white": "bg-gradient-to-r from-gray-300 via-white-400"}`}>
            <Layout><Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login/:userType?" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/registration/:userType?" element={<RegistrationPage />} />
            <Route path="/showvideo" element={<ShowVideo />} />
            <Route path='/patientData/:departmentId' element={<PatientData/>}/>
            <Route path="/subscriptionPlan" element={<SubscriptionPlanPage />} />
            <Route path="/subscription/:id" element={<SubscriptionDetailsPage />} />
            <Route path="/hospitalRegistration" element={<HospitalRegistrationForm />} />
            <Route path="/surgeonDashboard/:departmentId" element={<SurgeonDashBoard />} />
            <Route path="/surgeonList/:departmentId" element={<SurgeonList />} />
            <Route path="/cameralist/:departmentId" element={<CameraList />} />{/*  for surgeon  */}
            <Route path="/deviceList/:departmentId" element={<DeviceList />} />{/*  for surgeon device list  */}
            <Route path="/deviceListadmin/:departmentId" element={<DeviceListAdmin />} />
            <Route path="/department-details/:departmentId/:department_name" element={<DepartmentDetails />} />
            <Route path="/showvideo/:departmentId" element={<ShowVideo />} />
            <Route path="/createCamera/:departmentId" element={<CameraForm />} />
            <Route path="/notactive/:name" element={<MessageComponent />} />
            <Route path="/hospitalAdmin" element={<HospitalAdmin />} />
            <Route path='/activateHospitalAdmin/:hospitalId' element={<HospitalAdminData/>}/>            
            <Route path="/device/:cameraId/:departmentId" element={<ViewBucketFiles />} />
            <Route path="/signupPatient" element={<PatientRegistration />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patientvideos" element={<PatientVideos />} />
            <Route path="/device" element={<DeviceList />} />
            <Route path='/:role/reset-password/:token' element={<ResetPassword/>}/>
            <Route path="/createDepartment/:hospitalId" element={<DepartmentForm />} />
            <Route path="/createCamera/:departmentId/:department_name" element={<CameraForm />} />
            <Route path='/registerHospitalAdmin/:hospitalId/:role' element={<Register/>}/>
            <Route path='/updateCamera/:cameraId'element={<UpdateCamera/>}/>
            <Route path="/createSubscriptionPlan" element={<CreateSubScriptionPlan />} />
            <Route path="/superAdminDashboard" element={<SuperAdminDashboard />} />
            <Route path="/surgeonBucket/:cameraId" element={<SurgeonBucket />} />
            <Route path="/patientprofileupdate" element={<PatientUpdate />} />
            <Route path="/allHospitals" element={<AllHospitals />} />
            <Route path="/hospitalProfile/:hospitalId" element={<HospitalProfile/>}/>
            <Route path="/hospitalAdminData/:hospitalId" element={<HospitalAdminData/>}/>
            <Route path="/surgeonData/:surgeonId" element={<SurgeonData/>}/>
          <Route path="/superAllCameras" element={<SuperAllCamera/>}/>
          <Route path="/departmentGallerySuper/:hospitalId/:hospital_name" element={<DepartmentGallerySuper/>}></Route>
          <Route path="/departmentDetailSuper/:departmentId/:department_name" element={<DepartmentDetailsSuper/>}></Route></Routes></Layout>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
