const mongoose = require('mongoose');

// Define schema
const patientContentSchema = new mongoose.Schema({
    link: [{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: value => {
                // Check if the value is a valid URL
                try {
                    new URL(value);
                    return true;
                } catch (error) {
                    return false;
                }
            },
            message: props => `${props.value} is not a valid URL`
        }
    }],
    userId: {
        type:  mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    surgeonId: {
      type:  mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
    hospitalId: {
        type:  mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
   
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

// Create model
const PatientContent = mongoose.model('PatientContent', patientContentSchema);

module.exports = PatientContent;
