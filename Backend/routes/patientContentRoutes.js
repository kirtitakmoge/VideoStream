const express = require('express');
const patientContentController = require('../controller/PatientContentController');
const verifyToken = require('../auth/verifyToken');

// Create router
const router = express.Router();

// Routes for patient content
router.post('/createPatientContents',verifyToken, patientContentController.createPatientContent);
router.get('/patientContents', patientContentController.getAllPatientContent);
router.get('/patientContents/:userId', patientContentController.getPatientContentByUserId);
router.put('/patientContents/:id', patientContentController.updatePatientContent);
router.delete('/patientContents/:id', patientContentController.deletePatientContent);

module.exports = router;
