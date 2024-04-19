const Department = require('../models/Department');
const { isValidObjectId } = require('mongoose');
const Camera=require("../models/Camera");
// GET all departments
exports.getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        res.json(departments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET one department by ID
exports.getDepartmentById = async (req, res) => {
    const departmentId=req.params.departmentId;
    if(!isValidObjectId(departmentId))
    {
     return res.status(400).json({ error: "Invalid departmentID" });
    }
    try {
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        res.json(department);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// CREATE a new department
exports.createDepartment = async (req, res) => {
    console.log(req.body);
    const department = new Department({
        department_name: req.body.department_name,
        hospitalId: req.body.hospitalId,
     
    });
    try {
        const newDepartment = await department.save();
        console.log(newDepartment);
        res.status(201).json(newDepartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// UPDATE a department by ID
exports.updateDepartmentById = async (req, res) => {
    const departmentId=req.params.departmentId;
    if(!isValidObjectId(departmentId))
    {
     return res.status(400).json({ error: "Invalid departmentID" });
    }
    try {
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        
        if (req.body.department_name != null) {
            department.department_name = req.body.department_name;
        }
        if (req.body.hospital_id != null) {
            department.hospital_id = req.body.hospital_id;
        }
        if (req.body.cameras != null) {
            department.cameras = req.body.cameras;
        }

        const updatedDepartment = await department.save();
        res.json(updatedDepartment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// DELETE a department by ID
exports. deleteDepartmentById = async (req, res) => {
    const departmentId=req.params.departmentId;
    if(!isValidObjectId(departmentId))
    {
     return res.status(400).json({ error: "Invalid departmentID" });
    }
    try {
        const department = await Department.findById(departmentId);
        if (!department) {
            return res.status(404).json({ message: 'Department not found' });
        }
        
        await department.remove();
        res.json({ message: 'Department deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



//By HospitalId
exports.getAllDepartmentsByHospitalId = async (req, res) => {
    try {console.log("indepartment");
        const hospitalId = req.params.hospitalId;
        console.log(hospitalId);
        const departments = await Department.find({ hospitalId });
        console.log(departments);
        if (!departments || departments.length === 0) {
            return res.status(404).json({ message: 'No departments found for the provided Hospital ID' });
        }
 console.log(departments);
        res.status(200).json({ departments });
    } catch (error) {
        console.error('Error fetching departments by Hospital ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};