import React, { useState,useEffect } from "react";
import { toast } from "react-hot-toast";

const OTPVerification = ({ email, userId, onSuccess }) => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const otpResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/users/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, otp }),
      });

      if (otpResponse.ok) {
        const userData = await otpResponse.json();
        onSuccess(userData);
      }else {
        const errorData = await response.json();
        toast.error(errorData.message || 'Failed to verify OTP');
    }
    } catch (error) {
      console.error("An error occurred during OTP verification:", error.message);
    }
  };
  const handleResendOTP = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/resendOtp`, {
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
            toast.error('Failed to resend OTP');
        }
        
    } catch (error) {
        console.error('Error resending OTP:', error);
        toast.error('Failed to resend OTP');
    }
};// Effect to decrement the timer every second
useEffect(() => {
    const interval = setInterval(() => {
        if (timer > 0) {
            setTimer(timer - 1);
        }
    }, 1000);

    return () => clearInterval(interval);
}, [timer]);

// Function to format the timer in mm:ss format
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
          {timer===0? (
                <button  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                 onClick={handleResendOTP}>Resend OTP</button>
            ) : (
                <span>Resend OTP in {formatTimer()}</span>
            )}
        
        </div>
      </form>
    </div>
  );
};

export default OTPVerification;