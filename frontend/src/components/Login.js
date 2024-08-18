import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import OTPVerification from "./OTPVerification";

import { useSelector, useDispatch } from 'react-redux';
import { setUser, clearUser } from '../redux/slice/userSlice'; 
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOtpForm, setShowOtpForm] = useState(false);
  const [userId, setUserId] = useState(null);
  const user = useSelector(state => state.user.user); // Access the user state using useSelector
  const dispatch = useDispatch(); // Get the dispatch function

  const navigate = useNavigate();
  const { login } = useAuth();
  let { userType} = useParams();
  userType=userType || "Surgeon";

  let apiUrl = userType === "Patient"
  ? `${process.env.REACT_APP_API_URL}/api/patient/request-password-reset`
  : `${process.env.REACT_APP_API_URL}/api/users/request-password-reset`;
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
if(response.ok){
      const data = await response.json();
             toast.success(data.message);
      }
    } catch (error) {
      toast.error("Error in request for reset password");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let apiUrl = userType === "Patient"
        ? `${process.env.REACT_APP_API_URL}/api/patient/login`
        : `${process.env.REACT_APP_API_URL}/api/users/login`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success("OTP sent to your phone", {
          duration: 2000,
          position: "top-center",
        });
        setUserId(data.userId);
        setShowOtpForm(true);
      } else {
        toast.error("Login failed or invalid email", {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("An error occurred during login:", error.message);
    }
  };
  const handleShowLogin=()=>
    {
      setShowOtpForm(false);
    }

  const handleOTPVerificationSuccess = (userData) => {
    login(userData.user);
    localStorage.setItem("username", userData.user.firstname);
    localStorage.setItem("id", userData.user._id);
    localStorage.setItem("token", userData.token);
    localStorage.setItem("isLoggedIn", true);
    console.log(userData);
    dispatch(setUser(userData.user)); 
    // navigate("/generalDashboard");
    if (userData.user.role === "Super Admin") navigate(`/superAdminDashboard`);
    else if (userData.user.role === "Patient") navigate("/patient");
    else if (userData.user.role === "Hospital Admin" && userData.user.active === true)
      navigate(`/hospitalAdmin`);
    else if (
      userData.user.role === "Surgeon" &&
      (userData.user.bucketActive === true || userData.user.cameraActive === true)
    ) {
      navigate(`/surgeonDashboard/${userData.user.departmentId}`);
    } else if (userType === "Patient") {
      navigate("/patient");
    } else {
      navigate(`/notactive/${userData.user.firstname}`);
    }
  };

  return (
    <div className="flex mt-10 justify-center ">
      {showOtpForm ? (
        <OTPVerification userType={userType} email={email} userId={userId} onSuccess={handleOTPVerificationSuccess}  handleShowLogin={handleShowLogin}/>
      ) : (
        <div className="max-w-md w-full bg-white p-8 rounded shadow-lg">
          
          <h2 className="text-2xl font-bold text-center mb-8"> {userType} Login</h2>
          <form onSubmit={handleSubmit}>
          <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2 mr-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              className="text-blue-500 mb-2  text-right hover:underline"
              onClick={handleForgotPassword}
            >
              Forgot Password? Enter Email
            </button>
          <button className="w-full bg-red-500 hover:bg-red-600  text-white font-bold py-2 px-4 rounded">
            Login
          </button>
            
            <div className="flex justify-center items-center mt-4">
          
          <div className="flex ml-2">
            <a href="#" className="login100-social-item bg-blue-500 hover:bg-blue-600"><i className="fa fa-facebook"></i></a>
            <a href="#" className="login100-social-item bg-gray-400 hover:bg-gray-500"><i className="fa fa-twitter"></i></a>
            <a href="#" className="login100-social-item bg-red-500 hover:bg-red-600"><i className="fa fa-google"></i></a>
          </div>
        </div>
        <div className="flex justify-center items-center mt-4">
          <span className="text-sm ml-2">Don't have an account?</span>
          <span className="text-sm ml-2">  <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to={`/registration/${userType}`}
              >
                Sign up
              </Link></span>
        </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;