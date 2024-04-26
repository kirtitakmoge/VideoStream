import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";
import {useParams}  from "react-router-dom"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();
  const { user,login } = useAuth(); // Use useAuth directly within the component body
  const {userType}=useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiUrl = "";
      if (userType === "Patient") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/patient/login`;
      } else if (userType === "Surgeon") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/users/login`;
      }

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        toast.success(`Welcome ${userData.user.firstname}`, {
          duration: 2000,
          position: "top-center",
        });
        login(userData.user);
        localStorage.setItem("username", userData.user.firstname);
        localStorage.setItem("id", userData.user._id);
        localStorage.setItem("token", userData.token);
        localStorage.setItem("isLoggedIn", true);
        setPassword("");
        setEmail("");
        console.log(userData.user);
        if(userData.user.role === "Super Admin")
        navigate(`/superAdminDashboard`);
        if (userData.user.role === "Patient")
        navigate("/patient")
        if (userData.user.role === "Hospital Admin") {
          navigate(`/hospitalAdmin`);
        } else if (
          userData.user.role === "Surgeon" &&
          (userData.user.bucketActive === true ||
            userData.user.cameraActive === true)
        ) {
          navigate(`/surgeonDashboard/${userData.user.departmentId}`);
        } else if (userData.user.role === "Surgeon") {
          navigate(`/notactive/${userData.user.firstname}`);
        } else if (userType === "patient") {
          navigate("/patient");
        }
      } else {
        toast.error(`Login Failed or invalid email`, {
          duration: 2000,
          position: "top-center",
        });
      }
    } catch (error) {
      console.error("An error occurred during login:", error.message);
    }
  };

  return (
    <div className="container mt-6 mx-auto">
      
      <div className="max-w-md mx-auto  p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-bold mb-4 text-center">{userType} LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
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
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
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
          
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to={`/registration/${userType}`}
            >
              Create one
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
