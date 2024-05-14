const PatientContent = require('../models/PatientContent');
const { generatePresignedUrl, extractBucketAndKey } = require('../auth/generatePresignedUrl');
const User=require("../models/User");
const Patient = require('../models/Patient');
const patientContentController = {
    // Create a new patient content
    createPatientContent: async (req, res) => {
        try {
            const {
                userId,
                link, // Array of URLs
                surgeonId,
            } = req.body;
    console.log(req.body)
            // Check if required fields are provided
            if (!userId || !link || !Array.isArray(link) || link.length === 0 || !surgeonId) {
                return res.status(400).json({ message: 'All required fields must be provided' });
            }
    
            // Extract bucketName and objectKey from each link
            const linkObjects = link.map(url => {
                const { bucketName, objectKey } = extractBucketAndKey(url);
                return { url, bucketName, objectKey };
            });
    
            const date = new Date();
            const time = date.toLocaleTimeString();
    
            // Find the patient by userId
            const patient = await Patient.findById(userId);
    
            if (!patient) {
                return res.status(404).json({ message: 'Patient not found' });
            }
    
            // Create patient content
            const patientContent = new PatientContent({
                userId,
                link: linkObjects,
                surgeonId,
                date,
                time,
            });
            await patientContent.save();
            patient.patientcontentId = patientContent._id; // Assuming this is how you associate patient content with patient
            await patient.save(); // Save the patient after updating patient content ID
           console.log(patientContent._id,patient);
            // Save the patient content
    
            res.status(201).json({ message: 'Patient content created successfully', data: patientContent });
        } catch (error) {
            // Check if the error is a validation error for the compound index
            // Check if the error is a validation error for the compound index
if (error.name === 'MongoServerError' && error.code === 11000) {
    // Log the error for debugging
    console.error('Duplicate key error:', error);

    // Extract relevant information from the error
    const { keyValue } = error;

    // Check if the keyValue object exists and has the expected properties
    // Construct a custom error message
const errorMessage = `Below media  ${keyValue['link.objectKey']}  with userId ${keyValue.userId}  already Shared.`;
return res.status(400).json({ message: errorMessage });
}

    
            // For other types of errors, handle them appropriately
            console.error('Error:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
    
    
,getPatientContentByUserId: async (req, res) => {
    try {
        // Extract userId from the request parameters
        const { userId } = req.params;

        // Find all patient contents based on the userId
        const patientContents = await PatientContent.find({ userId });

        // If no patient content is found, return a 404 error
        if (!patientContents || patientContents.length === 0) {
            return res.status(404).json({ message: 'Patient content not found' });
        }

        // Array to store all presigned URLs with surgeon names for each patient content
        const allPresignedUrls = [];

        // Iterate through each patient content
        for (const patientContent of patientContents) {
            // Fetch the surgeon details based on the surgeonId in the patient content
            const surgeon = await User.findById(patientContent.surgeonId);

            // If no surgeon is found, return a 404 error
            if (!surgeon) {
                return res.status(404).json({ message: 'Surgeon not found' });
            }

            // Generate presigned URLs for each link in the patient content
            const presignedUrls = await Promise.all(patientContent.link.map(async (linkObj) => {
                try {
                    const { url, bucketName, objectKey } = linkObj;

                    // Generate the pre-signed URL for the link
                    const presignedUrl = await generatePresignedUrl(bucketName, objectKey);

                    return { presignedUrl ,objectKey, surgeonName: surgeon.firstname };
                } catch (error) {
                    console.error('Error generating pre-signed URL:', error);
                    return null;
                }
            }));

            // Push presigned URLs for the current patient content to the array
            allPresignedUrls.push( presignedUrls );
        }
        console.log(allPresignedUrls);

        // Return the array of presigned URLs with surgeon names for all patient contents
        res.status(200).json(allPresignedUrls);
    } catch (error) {
        console.error('Error retrieving patient content:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
,
        

getAllPatientContent:async (req, res) => {
    try {
        // Retrieve all patient content from the database
        const allPatientContent = await PatientContent.find();

        res.status(200).json({ data: allPatientContent });
    } catch (error) {
        console.error('Error retrieving patient content:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
},
    // Update a patient content by ID
    updatePatientContent: async (req, res) => {
        try {
            const updatedPatientContent = await PatientContent.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );
            if (!updatedPatientContent) {
                return res.status(404).json({ error: 'Patient content not found' });
            }
            res.json(updatedPatientContent);
        } catch (error) {
            console.error('Error updating patient content:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Delete a patient content by ID
    deletePatientContent: async (req, res) => {
        try {
            const deletedPatientContent = await PatientContent.findByIdAndDelete(req.params.id);
            if (!deletedPatientContent) {
                return res.status(404).json({ error: 'Patient content not found' });
            }
            res.json({ message: 'Patient content deleted successfully' });
        } catch (error) {
            console.error('Error deleting patient content:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
};

module.exports = patientContentController;
