import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { FaBars, FaTimes } from "react-icons/fa";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import DepartmentDetailsSuper from "./DepartmentDetailsSuper";
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
import Layout from "./Layout";

const NewApp = () => {
  const { user } = useAuth(); // Assuming useAuth provides user information
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navLinks = useMemo(() => {
    if (!user) {
      return (
        <ul>
          <li><Link to="/login/Patient">Patient Login</Link></li>
          <li><Link to="/patientRegistration">Patient Registration</Link></li>
          <li><Link to="/registration/Surgeon">Surgeon Registration</Link></li>
          <li><Link to="/login/Surgeon">Surgeon Login</Link></li>
        </ul>
      );
    } else {
      if (user.role === "Patient") {
        return (
          <ul>
            <li><Link to="/patient">Patient Dashboard</Link></li>
            <li><Link to="/patientvideos">Shared Surgery Videos by Surgeon</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      } else if (user.role === "Surgeon" && user.bucketActive && user.cameraActive) {
        return (
          <ul>
            <li><Link to={`/surgeonDashboard/${user.departmentId}`}>Surgeon Dashboard</Link></li>
            <li><Link to="/cameralist">Camera</Link></li>
            <li><Link to="/devicelist">Devices</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      } else if (user.role === "Hospital Admin" && user.active) {
        return (
          <ul>
            <li><Link to="/hospitalAdmin">Hospital Admin Dashboard</Link></li>
            <li><Link to="/createDepartment">Add New Department</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      } else if (user.role === "Super Admin") {
        return (
          <ul>
            <li><Link to="/superAdminDashboard">Super Admin Dashboard</Link></li>
            <li><Link to="/allHospitals">Hospitals</Link></li>
            <li><Link to="/hospitalRegistration">Register Hospital</Link></li>
            <li><Link to="/profileupdate">Profile Update</Link></li>
          </ul>
        );
      }
    }
  }, [user]);

  return (
    <Router>
      <div className="flex flex-col lg:flex-row">
        {/* Mobile sidebar toggle button */}
        <div className="lg:hidden"> {/* Only visible on mobile */}
          <button
            className="text-white p-4"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Sidebar navigation */}
        <nav className={`bg-gray-800 text-white w-48 min-h-screen fixed left-0 top-0 overflow-y-auto transition-transform duration-300 ease-in-out transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:relative lg:flex lg:flex-col lg:justify-start lg:shadow-lg`}>
          {/* Branding/logo */}
          <div className="p-4 flex items-center justify-between">
            <img
              src="https://th.bing.com/th?id=OIP.jLXDXo17XAjxbpkevv2kBAHaGV&w=270&h=231&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2"
              alt="Taurean Surgical Logo"
              className="w-12 h-12 mr-2"
            />
            <p className="text-lg font-semibold">Taurean Surgical</p>
          </div>

          {/* Navigation links */}
          <div className="mt-4">
            {navLinks}
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-grow p-4 lg:ml-48">
          <Navbar /> {/* Assuming Navbar contains navigation links for the main content */}
          <Layout>
          <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/login/:userType" element={<Login />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/profileupdate" element={<ProfileUpdate />} />
            <Route path="/signout" element={<SignOut />} />
            <Route path="/registration/:userType" element={<RegistrationPage />} />
            <Route path="/showvideo" element={<ShowVideo />} />
            <Route path="/subscriptionPlan" element={<SubscriptionPlanPage />} />
            <Route path="/subscription/:id" element={<SubscriptionDetailsPage />} />
            <Route path="/hospitalRegistration" element={<HospitalRegistrationForm />} />
            <Route path="/surgeonDashboard/:departmentId" element={<SurgeonDashBoard />} />
            <Route path="/surgeonList/:departmentId" element={<SurgeonList />} />
            <Route path="/cameralist" element={<CameraList />} />{/*  for surgeon  */}
            <Route path="/deviceList" element={<DeviceList />} />{/*  for surgeon device list  */}
            <Route path="/deviceListadmin/:departmentId" element={<DeviceListAdmin />} />
            <Route path="/department-details/:departmentId" element={<DepartmentDetails />} />
            <Route path="/showvideo/:departmentId" element={<ShowVideo />} />
            <Route path="/createCamera/:departmentId" element={<CameraForm />} />
            <Route path="/notactive/:name" element={<MessageComponent />} />
            <Route path="/hospitalAdmin/:hospitalId" element={<HospitalAdmin />} />
            <Route path="/device/:cameraId" element={<CameraMediaPage />} />
            <Route path="/signupPatient" element={<PatientRegistration />} />
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patientvideos" element={<PatientVideos />} />
            <Route path="/device" element={<DeviceList />} />
            <Route path="/createDepartment" element={<DepartmentForm />} />
            <Route path="/createCamera" element={<CameraForm />} />
            <Route path="/createSubscriptionPlan" element={<CreateSubScriptionPlan />} />
            <Route path="/superAdminDashboard" element={<SuperAdminDashboard />} />
            <Route path="/surgeonBucket/:cameraId" element={<SurgeonBucket />} />
            <Route path="/patientprofileupdate" element={<PatientUpdate />} />
            <Route path="/allHospitals" element={<AllHospitals />} />
            <Route path="/hospitalAdminData/:hospitalId" element={<HospitalAdminData/>}/>
          </Routes>
          </Layout>
        </main>
      </div>
      
    </Router>
  );
};

export default NewApp;
