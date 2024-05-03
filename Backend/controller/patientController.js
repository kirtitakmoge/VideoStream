const Patient = require('../models/Patient');
const PatientContent=require("../models/PatientContent");
const bcrypt = require('bcrypt');
const generateToken = require('../auth/generateToken');
const createPatient = async (req, res, next) => {
    const { firstname, password, age, gender, email, address,hospitalId,departmentId } = req.body;

    try {
        const patient = new Patient(req.body);
        const hashedPassword = await bcrypt.hash(patient.password, 10);
        patient.password=hashedPassword;
        console.log(req.body);
        await patient.save();
        const token=generateToken(patient);
        res.status(201).json(patient);
    } catch (error) {
        if (error.code === 11000) {
            // If the error is due to duplicate key (unique constraint violation)
            return res.status(400).json({ error: 'Email already exists' });
        }
        next(error);
    }
};

const getAllPatients = async (req, res, next) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
};

const getPatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

const updatePatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

const deletePatientById = async (req, res, next) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) {
            return res.status(404).json({ error: 'Patient not found' });
        }
        res.status(204).json();
    } catch (error) {
        next(error);
    }
};


const getAllPatientsByDepartmentId = async (req, res, next) => {
    const { departmentId } = req.params;

    try {
        const patients = await Patient.find({ departmentId }).populate("patientcontentId");
        
        console.log(patients);
      
        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const getAllPatientsByHospitalId = async (req, res) => {
    const { hospitalId } = req.params;
  
    try {
        const patients = await Patient.find({ hospitalId }).populate("patientcontentId");
        
        if (!patients || patients.length === 0) {
            return res.status(404).json({ message: "No patients found for the given hospital ID" });
        }

        res.status(200).json(patients);
    } catch (error) {
        console.error("Error fetching patients:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const loginPatient= async (req, res, next) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        const user = await Patient.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({user, token });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPatient,
    getAllPatients
    ,loginPatient,
    getPatientById,
    updatePatientById,
    deletePatientById,
    getAllPatientsByHospitalId,
    getAllPatientsByDepartmentId
};
