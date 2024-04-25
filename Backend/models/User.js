const mongoose = require('mongoose');
const Hospital = require("../models/Hospital");
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
    role: { 
        type: String, 
        enum: ['Surgeon', 'Hospital Admin', 'Super Admin'], 
        default: 'Surgeon'
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
    Specialization: { 
        type: String, 
         
    },
    mobile_no: { 
        type: String, 
        required: [true, "Enter Mobile Number"],
        unique: true,
        // Simple mobile number format validation
        match: [/^\d{10}$/, "Please enter a valid 10-digit mobile number"]
    },
    bucketActive:{
        type:Boolean,
        required:true,
        default:false
    },
    active:
    {
        type:Boolean,
        required:true,
        default:false
    },
    
    cameraActive:{
        type:Boolean,
        required:true,
        default:false
    }
    
});

const User = mongoose.model('User', userSchema);

module.exports = User;
