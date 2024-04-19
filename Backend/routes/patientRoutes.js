const express = require('express');
const router = express.Router();
const patientController = require('../controller/patientController');

// Routes for patient CRUD operations
router.post('/', patientController.createPatient);
router.post('/login', patientController.loginPatient);
router.get('/', patientController.getAllPatients);
router.get('/:id', patientController.getPatientById);
router.put('/:id', patientController.updatePatientById);
router.delete('/:id', patientController.deletePatientById);

module.exports = router;
