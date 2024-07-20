const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    firstname: { 
        type: String,
        required: [true, "Enter First Name"]
    },
    lastname: { 
        type: String, 
        required: [true, "Enter Last Name"] 
    },
    password: { 
        type: String, 
        required: [true, "Enter Password"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    email: { 
        type: String, 
        required: [true, "Enter Email Address"], 
        unique: true,
        // Simple email format validation
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "Please enter a valid email address"]
    },
    mobile_no: { 
        type: String, 
        required: [true, "Enter Mobile Number"],
    
        // Simple mobile number format validation
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
   
});

const User = mongoose.model('User', userSchema);

module.exports = User;
