const mongoose = require("mongoose");
const { Schema } = require('mongoose');
const User = require('../models/User');
const Hospital = require('../models/Hospital');
const videoSchema = new Schema({
    title: { 
        type: String, 
        required: [true, "Title is required"] 
    },
    description: { 
        type: String 
    },
    userID: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [true, "User ID is required"],
        validate: {
            validator: async function(value) {
                // Assuming the User model file is in the same directory
                const userExists = await User.exists({ _id: value });
                return userExists;
            },
            message: 'User with the provided ID does not exist'
        }
    },
    hospitalID: { 
        type: Schema.Types.ObjectId, 
        ref: 'Hospital', 
        required: [true, "Hospital ID is required"],
        validate: {
            validator: async function(value) {
                const HospitalModel = require('./hospitalModel'); // Assuming the Hospital model file is in the same directory
                const hospitalExists = await Hospital.exists({ _id: value });
                return hospitalExists;
            },
            message: 'Hospital with the provided ID does not exist'
        }
    },
    url: { 
        type: String, 
        required: [true, "URL is required"] 
    },
    uploadedAt: { 
        type: Date, 
        default: Date.now 
    }
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
