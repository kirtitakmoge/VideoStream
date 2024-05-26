import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const OTPVerification = ({ email, userId, userType, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = userType === "Patient"
      ? `${process.env.REACT_APP_API_URL}/api/patient/verifyOtp`
      : `${process.env.REACT_APP_API_URL}/api/users/verifyOtp`;

    try {
      const otpResponse = await fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, email, otp }),
      });

      if (otpResponse.ok) {
        const userData = await otpResponse.json();
        toast.success("OTP Verified");
        onSuccess(userData);
      } else {
        const errorData = await otpResponse.json();
        toast.error(errorData.message || 'Failed to verify OTP');
      }
    } catch (error) {
      console.error("An error occurred during OTP verification:", error.message);
      toast.error("An error occurred during OTP verification");
    }
  };

  const handleResendOTP = async (e) => {
    e.preventDefault();

    const apiUrl = userType === "Patient"
      ? `${process.env.REACT_APP_API_URL}/api/patient/resendOtp`
      : `${process.env.REACT_APP_API_URL}/api/users/resendOtp`;

    try {
      const response = await fetch(`${apiUrl}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setTimer(30);
        toast.success('OTP resent successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP');
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-center">OTP Verification</h2>
      <form onSubmit={handleOTPSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otp">
            Enter OTP
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="otp"
            type="text"
            placeholder="OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center gap-5">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Verify OTP
          </button>
          {timer === 0 ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleResendOTP}
            >
              Resend OTP
            </button>
          ) : (
            <span>Resend OTP in {formatTimer()}</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;
