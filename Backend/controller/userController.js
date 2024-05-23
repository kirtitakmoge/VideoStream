const generateToken = require('../auth/generateToken');
const Camera = require('../models/Camera');
const Department = require('../models/Department');
const Notification=require("../models/Notification");
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { isValidObjectId } = require('mongoose');
const sendWelcomeEmail = require('../auth/mailer');
const { generateOTP, sendOTPSMS } = require('../auth/generateOtp');
exports.signupUser = async (req, res) => {
    try {
        const newUser = new User(req.body);
        const hashedPassword = await bcrypt.hash(newUser.password, 10);
        console.log(req.body);
        // Finding department by name
       /* const department=await Department.findById(newUser.departmentId);
        if(!department)
        {
            return res.status(404).json({error:"not found hospital id"});
        }*/

        newUser.password = hashedPassword;
        await newUser.save();
        const notification = new Notification({
            hospitalId: newUser.hospitalId,
            userId: newUser._id,
            message: "Activate user"
          });
          
          // Save the notification to the database
          notification.save()
            .then(savedNotification => {
              console.log("Notification saved:", savedNotification);
            })
            .catch(error => {
              console.error("Error saving notification:", error);
            });
            sendWelcomeEmail(newUser.email);
        res.status(201).json({ user: newUser, message: 'User created successfully' ,success:true});
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Extracting validation error messages
            const validationErrors = Object.values(error.errors).map(error => error.message);
            console.log(validationErrors);
            return res.status(400).json({ errors: validationErrors });
        }
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getCameraUrlByUserId = async (req, res) => {
    const surgeonId = req.params.surgeonId;
    
    // Check if surgeonId is a valid ObjectId
    if (!isValidObjectId(surgeonId)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        // Find the user by surgeonId
        const user = await User.findById(surgeonId);

        // If user is not found, return 404 error
        if (!user) {
            return res.status(404).json({ error: "User not found for this surgeonId" });
        }
        console.log(user.cameraId);

        // If user is found, find the camera associated with the user
        const camera = await Camera.findById(user.cameraId);

        // If camera is not found, return 404 error
        if (!camera) {
            return res.status(404).json({ error: "Camera not found for this user" });
        }

        // If camera is found, return its URL
        return res.status(200).json({ url: camera.link });
    } catch (error) {
        // Handle any unexpected errors
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};

exports.updateRole = async (req, res) => {
    const surgeonId = req.params.surgeonId;
    
    if (!isValidObjectId(surgeonId)) {
        return res.status(400).json({ error: "Invalid surgeon ID" });
    }

    try {
        const user = await User.findByIdAndUpdate(surgeonId, { role: "Hospital Admin" }, { new: true });

        if (user) {
            res.status(200).json({ message: "Role updated successfully", user: { _id: user._id, role: user.role } });
        } else {
            res.status(404).json({ error: "Surgeon not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getAllUser = async (req, res) => {
    try {
        const allUser = await User.find();
  
        if (allUser.length > 0) {
            res.status(200).json(allUser);
        } else {
            res.status(404).json({ error: "No users found" });
        }
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getUserByID=async (req,res)=>
{
    const surgeonId=req.params.surgeonId;
    if(!isValidObjectId(surgeonId))
    {
      
     return res.status(400).json({message:"invalid id"});
    }
    const user=await User.findById(surgeonId).populate('departmentId').populate("hospitalId");
    console.log(user);
    if(user)
    {
        return res.status(200).json(user);
    }
    else{
        return res.status(404).json({error:"User not Found of this surgeonId"});
    }
}

exports.getHospitalAdminByHospitalId=async (req,res)=>
{
    const hospitalId=req.params.hospitalId;
  
    if(!isValidObjectId(hospitalId))
    {
      
     return res.status(400).json({message:"invalid id"});
    }
   
    try {
        const users = await User.findOne({ hospitalId ,role:"Hospital Admin"});
       console.log(users);
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(404).json({ error: "No Hospital Admins found for the given hospital ID" });
        }
    } catch (error) {
        console.error('Error fetching Hospital Admins:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


exports.deleteUserById=async(req,res)=>
{
    const id=req.params.Id;
   
    const user=await User.findByIdAndDelete(id);
        
    if(user)
    {
        return res.status(200).json({message:"user deleted"});
    }
    else{
        return res.status(404).json({error:"User not Found of this id"});
    } 

}

exports.updateUserById = async (req, res) => {
    const surgeonId = req.params.surgeonId;
    const updateUser = req.body;
console.log(updateUser);
    try {
        // Validate user object against schema
        await User.validate(updateUser);

        // Update the user
        const updatedUser = await User.findByIdAndUpdate(surgeonId, updateUser, { new: true });

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return res.status(200).json({ message: "Updated successfully", user: updatedUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Validation error occurred
            const validationErrors = Object.values(error.errors).map(error => error.message);
            return res.status(400).json({ message: validationErrors });
        } else {
            console.error("Error updating user:", error);
            return res.status(500).json({ message: "Internal Server Error" }); // Generic error message for other errors
        }
    }
}

exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate OTP
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = Date.now() + 2 * 60 * 1000;// OTP valid for 5 minutes
        await user.save();
        console.log(user);
        // Send OTP to user's phone using Twilio
        sendOTPSMS(user.mobile_no, otp);
        console.log("otp sent");

        res.status(200).json({ message: 'OTP sent to your phone', userId: user._id });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.resendOTP = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
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
// In your controller file
exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if OTP has expired
        if (Date.now() > user.otpExpires) {
            return res.status(400).json({ message: 'OTP has expired' });
        }

        // Check if OTP matches
        if (user.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // OTP is correct and not expired
        // Proceed with the rest of the login or registration process
        // Generate token and send response
        const token = generateToken(user);
        res.status(200).json({ message: 'OTP verified successfully', token });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller method to fetch all surgeons by hospitalId
exports.getSurgeonsByHospitalId = async (req, res) => {
    const hospitalId = req.params.hospitalId; // Assuming hospitalId is passed as a URL parameter
  console.log(hospitalId);
    try {
      // Query users with role 'Surgeon' and matching hospitalId
      const surgeons = await User.find({ role: 'Surgeon', hospitalId }).populate('departmentId');
      
      // If there are no surgeons found, return 404 status
      if (!surgeons) {
        return res.status(404).json({ message: 'No surgeons found for the given hospital ID' });
      }
  
      // If surgeons are found, return them in the response
      return res.status(200).json(surgeons);
    } catch (error) {
      // If an error occurs, return 500 status with the error message
      console.error('Error fetching surgeons:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
exports.getCamerasForUser=async (req,res) => {
    try {
        const surgeonId=req.params.surgeonId;
        console.log(surgeonId);
        if(!isValidObjectId(surgeonId))
        {
         return res.status(400).json({ error: "Invalid surgeonID" });
        }
        // Find the user by their ID
        const user = await User.findById(surgeonId);

        if (!user) {
            return res.status(404).json({error:"user not found"});
        }
          // Query for cameras with matching hospitalId and Specialization
        const cameras = await Camera.find({
            hospitalId: user.hospitalId,
            Specialization: user.Specialization
        });
         return res.status(200).json(cameras);
    } catch (error) {
        throw new Error('Error retrieving cameras for user: ' + error.message);
    }
}
exports. getUsersByDepartmentId = async (req, res) => {
    try {
      const departmentId = req.params.departmentId;
      console.log(departmentId);
      // Validate departmentId if needed, e.g., check if it's a valid ObjectId
      if(!isValidObjectId(departmentId))
        {
            console.log("invalid");
            return res.status(404).json({error:"invalid department ID"});
        }
      // Fetch users by departmentId from the User collection
      const users = await User.find({ departmentId: departmentId });
    console.log(users);
    if (!users || users.length === 0) {
        console.log(users.length);
        return res.status(404).json({ error: 'Users not found for the department' });
      }
  
  
      // If users found, return them
     return res.status(200).json(users);
    } catch (error) {
      // Handle errors
      console.error('Error fetching users by department ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
exports.updateUserActiveStatus = async (req, res) => {
    const { id } = req.params;
    const { bucketActive,cameraActive } = req.body; 
    console.log(bucketActive);// Assuming you pass the new active status in the request body
    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.bucketActive = bucketActive; 
      user.cameraActive = cameraActive; // Update the active field
      await user.save();
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  exports.updateHospitalAdminActiveStatus = async (req, res) => {
    const { adminId } = req.params;
    const { active } = req.body; 
   // Assuming you pass the new active status in the request body
    try {
      const user = await User.findById(adminId );
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
    console.log(user);
      user.active = active; // Update the active field
      await user.save();
      return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  