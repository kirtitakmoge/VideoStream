const Hospital = require('../models/Hospital');
const { isValidObjectId } = require('mongoose');
// Create a new hospital
exports.createHospital = async (req, res) => {
    try {
        const newHospital = new Hospital(req.body);
        await newHospital.save();
        res.status(201).json({ message: 'Hospital created successfully' });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(error => error.message);
            console.log(validationErrors);
            return res.status(400).json({ errors: validationErrors });
        }
        console.error('Error creating hospital:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
exports.getAllHospitalNames = async (req, res) => {
    try {
        const hospitals = await Hospital.find({}, 'Hospital_Name');
        const hospitalNames = hospitals.map(hospital => hospital.Hospital_Name);
        res.status(200).json(hospitalNames);
    } catch (error) {
        console.error('Error retrieving hospital names:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
// Get all hospitals
exports.getAllHospitals = async (req, res) => {
    try {
        console.log("in get all hospital");
        const hospitals = await Hospital.find();
        console.log(hospitals);
        res.status(200).json(hospitals);
    } catch (error) {
        console.error('Error getting hospitals:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Get hospital by ID
exports.getHospitalById = async (req, res) => {
    const hospitalId = req.params.hospitalId;
     // Check if the provided ID is a valid ObjectId
     if (!isValidObjectId(hospitalId)) {
        return res.status(400).json({ error: "Invalid Id" });
    }
    
    try {
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        res.status(200).json(hospital);
    } catch (error) {
        console.error('Error getting hospital by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update hospital by ID
exports.updateHospitalById = async (req, res) => {
    const hospitalId = req.params.hospitalId;
    // Check if the provided ID is a valid ObjectId
    if (!isValidObjectId(hospitalId)) {
       return res.status(400).json({ error: "Invalid Id" });
   }
    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(hospitalId, req.body, { new: true });
        if (!updatedHospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        res.status(200).json(updatedHospital);
    } catch (error) {
        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(error => error.message);
            return res.status(400).json({ errors: validationErrors });
        }
        console.error('Error updating hospital by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Delete hospital by ID
exports.deleteHospitalById = async (req, res) => {
    const hospitalId = req.params.hospitalId;
     // Check if the provided ID is a valid ObjectId
     if (!isValidObjectId(hospitalId)) {
        return res.status(400).json({ error: "Invalid Id" });
    }
    try {
        const deletedHospital = await Hospital.findByIdAndDelete(hospitalId);
        if (!deletedHospital) {
            return res.status(404).json({ error: 'Hospital not found' });
        }
        res.status(200).json({ message: 'Hospital deleted successfully' });
    } catch (error) {
        console.error('Error deleting hospital by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
