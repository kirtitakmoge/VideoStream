const PatientContent = require('../models/PatientContent');
const generatePresignedUrl=require("../auth/generatePresignedUrl");
const patientContentController = {
    // Create a new patient content
    createPatientContent: async (req, res) => {
        try {
            const {userId, surgeonId, link} = req.body;

            // Get the current date and time
            const currentDate = new Date();
            const currentTime = currentDate.toLocaleTimeString(); // Format the time as a string
        console.log(link);
            // Create a new instance of PatientContent with the provided data
            const newPatientContent = new PatientContent({
              link,
              userId,
              surgeonId,
             date: currentDate,
              time: currentTime,
            
            });
        
            // Save the newPatientContent to the database
            const savedPatientContent = await newPatientContent.save();
            res.status(201).json(savedPatientContent);
        } catch (error) {
            console.error('Error creating patient content:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get all patient contents
    getAllPatientContents: async (req, res) => {
        try {
            const patientContents = await PatientContent.find();
            return res.status(200).json(patientContents);
        } catch (error) {
            console.error('Error getting patient contents:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    // Get a single patient content by ID
    getPatientContentById: async (req, res) => {
        try {
            // Find patient content by user ID
            const patientContent = await PatientContent.find({ userId: req.params.userId }).populate("surgeonId");
            
            // Check if patient content exists
            if (!patientContent || patientContent.length === 0) {
                return res.status(404).json({ error: 'Patient content not found' });
            }
    
            // Create an array to store promises for generating pre-signed URLs
            const promises = [];
     
            // Iterate over each patient content
            patientContent.forEach(patient => {
                // Iterate over each item in the link array
                console.log(patient);
                patient.link.forEach(item => {
                    // Generate a pre-signed URL for each item and add the promise to the array
                    const url=generatePresignedUrl(item);
                    promises.push(url);
                    console.log(url)
                });
            });
    
            // Wait for all promises to resolve
            const urls = await Promise.all(promises);
            const dataWithUrls = patientContent.map((patient, index) => {
                return {
                  surgeonName:patient.surgeonId.firstname,
                  url: urls[index]
                };
              });
          
              // Respond to the client with both patient data and URLs
              res.status(200).json(dataWithUrls); 
            // Send the array of URLs in the response
           
        } catch (error) {
            console.error('Error getting patient content by ID:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
,    

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
