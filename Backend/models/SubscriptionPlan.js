const mongoose = require('mongoose');

const subscriptionPlanSchema = new mongoose.Schema({
  planName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  features: {
    type: String,
    required: true
  },
  resolution: {
    type: String,
    required: true
  },
  
  dataLimit: {
    type: Number,
    required: true,
    default:10
  },
  duration: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  dataReductionFactor: {
    type: Number,
    required: true
  },
  maxDevices: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value > 0;
      },
      message: 'Max devices must be a positive number.'
    }
  }
});

const SubscriptionPlan = mongoose.model('SubscriptionPlan', subscriptionPlanSchema);

module.exports = SubscriptionPlan;
