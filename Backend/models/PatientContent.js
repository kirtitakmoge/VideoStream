const mongoose = require('mongoose');

// Define schema
const patientContentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    link: [{
        url: {
            type: String,
            required: true
        },
        bucketName: {
            type: String,
            required: true
        },
        objectKey: {
            type: String,
            required: true
        }
    }],
    surgeonId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
   
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String
    },
    history: {
        type: String
    }
});

// Create a compound index for userId, bucketName, and objectKey to enforce uniqueness
patientContentSchema.index({ userId: 1, 'link.bucketName': 1, 'link.objectKey': 1 }, { unique: true });

// Create model
const PatientContent = mongoose.model('PatientContent', patientContentSchema);

module.exports = PatientContent;
