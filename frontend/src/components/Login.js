import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAuth } from "./AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use useAuth directly within the component body

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let apiUrl = "";
      if (userType === "patient") {
        apiUrl = `${process.env.REACT_APP_API_URL}/api/patient/login`;
      } else if (userType === "surgeon") {
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
        login();
        localStorage.setItem("username", userData.user.firstname);
        localStorage.setItem("id", userData.user._id);
        localStorage.setItem("token", userData.token);
        setPassword("");
        setEmail("");
        console.log(userData.user);
        if (userData.user.role === "Hospital Admin") {
          navigate(`/hospitalAdmin/${userData.user.hospitalId}`);
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
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
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
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="userType"
            >
              User Type
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="patient">Patient</option>
              <option value="surgeon">Surgeon</option>
            </select>
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
              to="/signup"
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
