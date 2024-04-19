const mongoose = require('mongoose');

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
  

});

// Create unique index on email field
patientSchema.index({ email: 1 }, { unique: true });

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
