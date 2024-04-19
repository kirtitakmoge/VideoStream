// Import mongoose
const mongoose = require('mongoose');

// Define notification schema
const notificationSchema = new mongoose.Schema({
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create Notification model
const Notification = mongoose.model('Notification', notificationSchema);

// Export the model
module.exports = Notification;
