const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    role: {
        type: String,
        enum: ['member', 'owner'],
        default: 'member'
    },
    // other membership fields if necessary
}, {
    timestamps: true // Adds createdAt and updatedAt timestamps
});

const Membership = mongoose.model('Membership', membershipSchema);

module.exports = Membership;
