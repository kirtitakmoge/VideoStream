const Patient = require('../models/Patient');
const PatientContent=require("../models/PatientContent");
const twilio = require('twilio');
const dotenv = require('dotenv').config();
// Secret key for JWT
const secretKey = process.env.JWT_SECRETE_KEY;
const bcrypt = require('bcrypt');
const generateToken = require('../auth/generateToken');
const { generateOTP, sendOTPSMS } = require('../auth/generateOtp');
const jwt = require('jsonwebtoken');
const { sendPasswordResetEmail } = require('../auth/mailer');
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;
 
    try {
      const user = await Patient.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Generate a reset token
      const resetToken =  generateToken(user);
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // Set expiration time to 1 hour from now
      await user.save();
      console.log("in patient Reset Password")
     role="patient";
      // Send password reset emailc:\Users\Kirti\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20240524-1052-10.7537932.mp4
      await sendPasswordResetEmail(user.email, resetToken,role);
  
      res.status(200).json({ message: 'Password reset email sent',success:true });
    } catch (error) {
      console.error('Error requesting password reset:', error);
      res.status(500).json({ message: 'Internal server error',succces:false});
    }
  };
  
const createPatient = async (req, res, next) => {
    const { firstname, password, age, gender, email, address,hospitalId,departmentId } = req.body;

    try {
        const patient = new Patient(req.body);
        const hashedPassword = await bcrypt.hash(patient.password, 10);
        patient.password=hashedPassword;
        console.log(req.body);
        await patient.save();
        const token=generateToken(patient);
        res.status(201).json(patient);
    } catch (error) {
        if (error.code === 11000) {
            // If the error is due to duplicate key (unique constraint violation)
            return res.status(400).json({ error: 'Email already exists' });
        }
        next(error);
    }
};
const resendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await Patient.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a new OTP
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 2 * 60 * 1000;; // OTP valid for 5 minutes

        // Save the updated user document
        await user.save();

        // Send OTP to user's phone using Twilio
        sendOTPSMS(user.mobile_no, otp);
        console.log("OTP resent:", otp);

        res.status(200).json({ message: 'OTP resent to your phone' });
    } catch (error) {
        console.error('Error resending OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
};

const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

const updatePatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

const deletePatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};


const getAllPatientsByDepartmentId = async (req, res, next) => {
    const { departmentId } = req.params;

    try {
        const patients = await Patient.find({departmentId: departmentId }).populate("patientcontentId");
        
        console.log(patients);
      
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const getAllPatientsByHospitalId = async (req, res) => {
    const { hospitalId } = req.params;
  
    try {
        const patients = await Patient.find({ hospitalId }).populate("patientcontentId");
        
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: "No patients found for the given hospital ID" });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// In your controller file
const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
console.log(email);
    try {
        const user = await Patient.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP has expired
        const ph = "+91" + user.mobile_no;
        // Use Twilio Verify API to check OTP
        const verificationCheck = await client.verify.services(process.env.TWILIO_MESSAGING_SERVICE_SID)
            .verificationChecks
            .create({
                to: ph,
                code: otp
            });

        if (verificationCheck.status === 'approved') {

        // OTP is correct and not expired
        // Proceed with the rest of the login or registration process
        // Generate token and send response
        const token = generateToken(user);
     
        res.status(200).json({ message: 'OTP verified successfully',succces:true,user, token });
    } }catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const loginPatient= async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await Patient.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 2 * 60 * 1000;// OTP valid for 5 minutes
        await user.save();
        // Generate JWT token
        sendOTPSMS(user.mobile_no, otp);
        console.log("otp sent");

        res.status(200).json({ message: 'OTP sent to your phone', userId: user._id });
    } catch (error) {
        next(error);
    }
};
 
const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  console.log(token);
    try {
      // Verify the token
      const decoded =jwt.verify(token,secretKey);
   console.log(decoded);
      // Find the user by the reset token and ensure it's not expired
      const user = await Patient.findOne({
        email: decoded.email,
        resetPasswordToken: token,
        
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      console.log(user);
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, 10);
  
      // Clear the reset token and expiration
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

module.exports = {
    resendOTP,verifyOtp,requestPasswordReset,resetPassword,
    createPatient,
    getAllPatients
    ,loginPatient,
    getPatientById,
    updatePatientById,
    deletePatientById,
    getAllPatientsByHospitalId,
    getAllPatientsByDepartmentId
};
