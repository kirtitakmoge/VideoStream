const express = require('express');
const patientContentController = require('../controller/PatientContentController');

// Create router
const router = express.Router();

// Routes for patient content
router.post('/patientContents', patientContentController.createPatientContent);
router.get('/patientContents', patientContentController.getAllPatientContents);
router.get('/patientContents/:userId', patientContentController.getPatientContentById);
router.put('/patientContents/:id', patientContentController.updatePatientContent);
router.delete('/patientContents/:id', patientContentController.deletePatientContent);

module.exports = router;
