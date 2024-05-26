const mongoose = require('mongoose');
const Hospital = require("../models/Hospital");
const { Schema } = mongoose;

const patientSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'Name is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [0, 'Age must be a positive number']
    },
    role:{
        type: String,
        default:"Patient"
    },
    hospitalId: { 
        type: Schema.Types.ObjectId, 
        ref: 'Hospital',
        // Custom validation to check if hospitalId references a valid hospital
        validate: {
            validator: async function (value) {
                if(value!=null){
                const hospital = await Hospital.findById(value);
                return !!hospital;}
            },
            message: props => `Hospital with ID ${props.value} does not exist`
        }
    },
    departmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
      },
    gender: {
        type: String,
        enum: {
            values: ["male", "female", "other"],
            message: 'Invalid gender'
        },
        required: [true, 'Gender is required']
    },
    email: { 
        type: String, 
        unique: true,
        required: [true, "Enter Email Address"], 
      
        // Simple email format validation
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email address"]
    },
    address: {
        type: String,
        required: [true, 'Address is required']
    },
  patientcontentId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PatientContent'
  },
  otp: {
    type: String,
    required: false
},
otpExpires: {
    type: Date,
    required: false
},
mobile_no: { 
    type: String, 
    required: [true, "Enter Mobile Number"],
    
    // Simple mobile number format validation
    match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
},
resetPasswordToken: { type: String },
resetPasswordExpires: { type: Date }
});

// Create unique index on email field
patientSchema.index({ email: 1 }, { unique: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
