const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    // other group fields if necessary
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Group = mongoose.model('Group', groupSchema);

module.exports = Group;
