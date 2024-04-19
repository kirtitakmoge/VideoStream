const mongoose = require('mongoose');
const Hospital = require("./Hospital");
const { Schema } = mongoose;

const departmentSchema = new Schema({
    department_name: { 
        type: String, 
        required: [true, 'Department name is required.'],
        trim: true
    },
    hospitalId: { 
        type: String, 
        required: [true, 'Hospital ID is required.'],
        trim: true
    },
 
}, {
    toJSON: {
        virtuals: true
    },
    id: false
});

departmentSchema.virtual("departmentId").get(function() {
    return this._id.toHexString();
});

// Pre-save hook to check if the associated hospital exists
departmentSchema.pre('save', async function(next) {
    try {
        const Hospital = mongoose.model('Hospital'); 
        const hospitalExists = await Hospital.exists({ _id: this.hospitalId });
        if (!hospitalExists) {
            const error = new Error('Hospital with the provided ID does not exist');
            error.name = 'ValidationError';
            throw error;
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Department = mongoose.model('Department', departmentSchema);

module.exports = Department;
