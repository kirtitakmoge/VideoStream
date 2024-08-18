const generateToken = require('../auth/generateToken');
const Camera = require('../models/Camera');
const Department = require('../models/Department');
const Notification=require("../models/Notification");
const User = require('../models/User');

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const bcrypt = require('bcrypt');
const { isValidObjectId } = require('mongoose');
const {sendWelcomeEmail} = require('../auth/mailer');
const { generateOTP, sendOTPSMS } = require('../auth/generateOtp');
const jwt = require('jsonwebtoken');
const Hospital=require("../models/Hospital");
const upload=require("../auth/multerConfig");

// Secret key for JWT

const dotenv = require('dotenv').config();
// Secret key for JWT
const secretKey = process.env.JWT_SECRETE_KEY;
exports.signupUser = [
  upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'idProof', maxCount: 1 }]), // multer middleware
  async (req, res) => {
    try {
      const { hospitalId,departmentId, password, email, role } = req.body;
      const files = req.files; // Files will be an object with arrays for each field

      console.log('Request Body:', req.body);
      console.log('Files:', files);

      if (role === "Hospital Admin") {
        // Check if required files are present
        if (!files || !files.profilePicture || !files.idProof) {
          return res.status(400).json({ error: 'Profile picture and ID proof are required.' });
        }
      }

      const hospital = await Hospital.findOne({ hospital_Id: hospitalId });
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found.' });
      }
      const department = await Department.findById( departmentId );
      if (!department) {
        return res.status(404).json({ error: 'department not found.' });
      }

      const newUser = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role,
        hospitals: [{
          hospitalId: hospital._id,
          departmentId: [department._id] // Single department in an array
        }],
        specialization: req.body.specialization,
        mobile_no: req.body.mobile_no,
        profilePicture: files?.profilePicture ? files.profilePicture[0]?.path : undefined,
        idProof: files?.idProof ? files.idProof[0]?.path : undefined
      });
   
      const hashedPassword = await bcrypt.hash(password, 10);
      newUser.password = hashedPassword;

      await newUser.save();

      const notification = new Notification({
        hospitalId: newUser.hospitals[0].hospitalId,
        userId: newUser._id,
        message: "Activate user"
      });

      await notification.save();
      console.log('New User:', newUser);

      const mail = sendWelcomeEmail(newUser.email);
      console.log('Mail:', mail);

      if (mail) {
        res.status(201).json({ user: newUser, message: 'User created successfully', success: true });
      } else {
        res.status(500).json({ success: false, error: 'Failed to send welcome email.' });
      }
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = Object.values(error.errors).map(err => err.message);
        return res.status(400).json({ errors: validationErrors });
      }
      console.error('Error creating user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
];
//no need to change for hospital
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

// no need for change in hospital
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

exports.addDepartment= async (req, res) => {
  const { surgeonId } = req.params;
  const { hospitalId, departmentId } = req.body;
console.log(req.body);
  try {
      // Find the user
      const user = await User.findById(surgeonId);
      
      if (!user) return res.status(404).send('User not found');
      const hospital = await Hospital.findOne({ hospital_Id: hospitalId });
      if (!hospital) {
        console.log("hospital not found");
        return res.status(404).json({ error: 'Hospital not found.' });
      }
      // Check if hospitalId already exists
      let hospitalEntry = user.hospitals.find(h => h.hospitalId.toString() ===hospital._id);

      if (hospitalEntry) {
          // Add the department to the existing entry
          if (!hospitalEntry.departmentId.includes(departmentId)) {
              hospitalEntry.departmentId.push(departmentId);
          }
      } else {
          // Create a new hospital entry
          user.hospitals.push({
             hospitalId: hospital._id,
              departmentId: [departmentId],
          });
      }

      // Save the user
      await user.save();

      res.status(200).send('Department added successfully');
  } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
  }
}
exports.updateDepartment = async (req, res) => {
    const { surgeonId } = req.params;
    const { hospitalId, departmentId } = req.body;
  
    try {
      // Find the user by ID
      const user = await User.findById(surgeonId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Validate the hospital ID
      const hospital = await Hospital.findOne({ hospital_Id: hospitalId }); // Use _id for querying
      if (!hospital) {
        return res.status(404).json({ error: 'Hospital not found.' });
      }
  
      // Find the hospital entry in the user's hospitals array
      user.hospitals= [{
        hospitalId: hospital._id,
        departmentId: [departmentId] // Single department in an array
      }],
      await user.markModified('hospitals');
      await user.save();
      
      res.status(200).json({ message: 'Department updated successfully' });
    } catch (err) {
      console.error('Error updating department:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
  
exports.getAllUser = async (req, res) => {
  try {
      const allUser = await User.find()
          .populate({
              path: 'hospitals.hospitalId', // Populate hospitalId field within the hospitals array
              select: 'Hospital_Name', // Fields to include from the Hospital model
              model: 'Hospital'
          })
          .populate({
              path: 'hospitals.departmentId', // Populate departmentId field within the hospitals array
              select: 'department_name', // Fields to include from the Department model
              model: 'Department'
          });

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
    

// exports.getUserByID=async (req,res)=>
// {
//     const surgeonId=req.params.surgeonId;
//     console.log("in getuserbyid:",surgeonId);
//     if(!isValidObjectId(surgeonId))
//     {
      
//      return res.status(400).json({message:"invalid id"});
//     }
//     const user=await User.findById(surgeonId).populate('departmentId').populate("hospitalId");
//     console.log(user);
//     if(user)
//     {
//         return res.status(200).json(user);
//     }
//     else{
//         return res.status(404).json({error:"User not Found of this surgeonId"});
//     }
// }
 // Ensure mongoose is required for isValidObjectId

exports.getUserByID = async (req, res) => {
    const surgeonId = req.params.surgeonId;
    console.log("in getUserByID:", surgeonId);

    if (!isValidObjectId(surgeonId)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        const user = await User.findById(surgeonId)
            .populate({
                path: 'hospitals.hospitalId', // Populate hospitalId within the hospitals array
                select: 'Hospital_Name', // Adjust field names as per your schema
                model: 'Hospital'
            })
            .populate({
                path: 'hospitals.departmentId', // Populate departmentId within the hospitals array
                select: 'department_name', // Adjust field names as per your schema
                model: 'Department'
            });

        console.log(user);

        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ error: "User not found for this surgeonId" });
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


// exports.getHospitalAdminByHospitalId=async (req,res)=>
// {
//     const hospitalId=req.params.hospitalId;
//   console.log(hospitalId)
//     if(!isValidObjectId(hospitalId))
//     {
      
//      return res.status(400).json({message:"invalid id"});
//     }
   
//     try {
//         const users = await User.findOne({ hospitalId ,role:"Hospital Admin"});
//        console.log(users);
//         if (users) {
//             res.status(200).json(users);
//         } else {
//             res.status(404).json({ error: "No Hospital Admins found for the given hospital ID" });
//         }
//     } catch (error) {
//         console.error('Error fetching Hospital Admins:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// }



exports.getHospitalAdminByHospitalId = async (req, res) => {
    const hospitalId = req.params.hospitalId;
    console.log(hospitalId);

    if (!isValidObjectId(hospitalId)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        // Find users where the hospitals array contains an object with the given hospitalId and role is "Hospital Admin"
        const users = await User.findOne({
            "hospitals.hospitalId": hospitalId,
            role: "Hospital Admin"
        });

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
    const surgeonId=req.params.surgeonId;
    console.log("request to delete");
    const user=await User.findByIdAndDelete(surgeonId);
        
    if(user)
    {
        console.log("User deleted");
        return res.status(200).json({message:"user deleted"});
    }
    else{
        return res.status(404).json({error:"User not Found of this id"});
    } 

}
exports.updateUserById = async (req, res) => {
    const surgeonId = req.params.surgeonId;
    const updateUser = req.body;
    console.log(updateUser)
    try {
        

        // Construct update object with only the provided fields
        const updateFields = {};
        for (const key in updateUser) {
            updateFields[key] = updateUser[key];
        }

        // Update the user with only the provided fields
        const updatedUser = await User.findByIdAndUpdate(surgeonId, { $set: updateFields }, { new: true }) .populate({
          path: 'hospitals.hospitalId', // Populate hospitalId within the hospitals array
          select: 'Hospital_Name', // Adjust field names as per your schema
          model: 'Hospital'
      })
      .populate({
          path: 'hospitals.departmentId', // Populate departmentId within the hospitals array
          select: 'department_name', // Adjust field names as per your schema
          model: 'Department'
      });

        if (!updatedUser) {
            throw new Error("User not found");
        }

        return res.status(200).json({ message: "Updated successfully", user: updatedUser });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Validation error occurred` 
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
        const user = await User.findOne({ email }).populate({
          path: 'hospitals.hospitalId', // Populate hospitalId within the hospitals array
          select: 'Hospital_Name', // Adjust field names as per your schema
          model: 'Hospital'
      })
      .populate({
          path: 'hospitals.departmentId', // Populate departmentId within the hospitals array
          select: 'department_name', // Adjust field names as per your schema
          model: 'Department'
      });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // Generate OTP
       
        await user.save();
        console.log(accountSid);
        // Send OTP to user's phone using Twilio
        sendOTPSMS(user.mobile_no);
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
};const twilio = require('twilio');




const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

exports.verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    console.log(email);

    try {
        const user = await User.findOne({ email }).populate({
          path: 'hospitals.hospitalId', // Populate hospitalId within the hospitals array
          select: 'Hospital_Name', // Adjust field names as per your schema
          model: 'Hospital'
      })
      .populate({
          path: 'hospitals.departmentId', // Populate departmentId within the hospitals array
          select: 'department_name', // Adjust field names as per your schema
          model: 'Department'
      });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const ph = "+91" + user.mobile_no; // Assuming user object has a phone attribute

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

            // Optionally clear OTP-related fields if stored in the database
           
            await user.save();

            return res.status(200).json({ message: 'OTP verified successfully', success: true, user, token });
        } else {
            return res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};



const { sendPasswordResetEmail } = require('../auth/mailer');

exports.requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a reset token
    const resetToken =  generateToken(user);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Set expiration time to 1 hour from now
    await user.save();
 role="Surgeon"
    // Send password reset emailc:\Users\Kirti\AppData\Local\Packages\Microsoft.ScreenSketch_8wekyb3d8bbwe\TempState\Recordings\20240524-1052-10.7537932.mp4
    await sendPasswordResetEmail(user.email, resetToken,role);

    res.status(200).json({ message: 'Password reset email sent',success:true });
  } catch (error) {
    console.error('Error requesting password reset:', error);
    res.status(500).json({ message: 'Internal server error',succces:false});
  }
};


// // Controller method to fetch all surgeons by hospitalId
// exports.getSurgeonsByHospitalId = async (req, res) => {
//     const hospitalId = req.params.hospitalId; // Assuming hospitalId is passed as a URL parameter
//   console.log(hospitalId);
//     try {
//       // Query users with role 'Surgeon' and matching hospitalId
//       const surgeons = await User.find({ role: 'Surgeon', hospitalId }).populate('departmentId');
      
//       // If there are no surgeons found, return 404 status
//       if (!surgeons) {
//         return res.status(404).json({ message: 'No surgeons found for the given hospital ID' });
//       }
  
//       // If surgeons are found, return them in the response
//       return res.status(200).json(surgeons);
//     } catch (error) {
//       // If an error occurs, return 500 status with the error message
//       console.error('Error fetching surgeons:', error);
//       return res.status(500).json({ message: 'Internal server error' });
//     }
//   };
// Controller method to fetch all surgeons by hospitalId
exports.getSurgeonsByHospitalId = async (req, res) => {
  const hospitalId = req.params.hospitalId; // Assuming hospitalId is passed as a URL parameter

  console.log(hospitalId);

  try {
      // Query users with role 'Surgeon' and matching hospitalId in the hospitals array
      const surgeons = await User.find({
          role: 'Surgeon',
          'hospitals': {
              $elemMatch: { hospitalId: hospitalId }
          }
      }).populate('departmentId');

      // If there are no surgeons found, return 404 status
      if (!surgeons || surgeons.length === 0) {
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
// exports. getUsersByDepartmentId = async (req, res) => {
//     try {
//       const departmentId = req.params.departmentId;
//       console.log(departmentId);
//       // Validate departmentId if needed, e.g., check if it's a valid ObjectId
//       if(!isValidObjectId(departmentId))
//         {
//             console.log("invalid");
//             return res.status(404).json({error:"invalid department ID"});
//         }
//       // Fetch users by departmentId from the User collection
//       const users = await User.find({ departmentId: departmentId });
//     console.log(users);
//     if (!users || users.length === 0) {
//         console.log(users.length);
//         return res.status(404).json({ error: 'Users not found for the department' });
//       }
  
  
//       // If users found, return them
//      return res.status(200).json(users);
//     } catch (error) {
//       // Handle errors
//       console.error('Error fetching users by department ID:', error);
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   };
exports.getUsersByDepartmentId = async (req, res) => {
  try {
      const departmentId = req.params.departmentId;

      // Validate departmentId
      if (!isValidObjectId(departmentId)) {
          console.log("Invalid department ID");
          return res.status(400).json({ error: "Invalid department ID" });
      }

      // Fetch users by departmentId
      const users = await User.find({
          'hospitals': {
              $elemMatch: { departmentId: departmentId }
          }
      }).populate('hospitals.hospitalId', 'Hospital_Name') // Optionally populate hospital details
      .populate('hospitals.departmentId', 'department_name'); // Optionally populate department details

      if (!users || users.length === 0) {
          return res.status(200).json({ error: 'No users found for the given department',users:[] });
      }

      // Return found users
      console.log("from department",users);
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
  
exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;
  console.log(token);
  console.log(secretKey);
    try {
      // Verify the token
      const decoded =jwt.verify(token,secretKey);
   console.log(decoded);
      // Find the user by the reset token and ensure it's not expired
      const user = await User.findOne({
        email: decoded.context.user.name,
        resetPasswordToken: token,
        
      });
      console.log(user);
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      
  
      // Hash the new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
  
      // Clear the reset token and expiration
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
  
      await user.save();
  
      res.status(200).json({ message: 'Password has been reset' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
}