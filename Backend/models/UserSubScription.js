const mongoose = require('mongoose');
const { Schema } = mongoose;

const subscriptionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId,
         ref: 'User', 
         required: true },
  subscriptionId: {
    type: Schema.Types.ObjectId,
    ref: 'SubscriptionPlan', 
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Expired', 'Cancelled'],
    default: 'Active'
  },
  usedData: {
    type: Number,
    required: true
  },
  remainingData: {
    type: Number,
    required: true
  }
});

const UserSubscription = mongoose.model('UserSubscription', subscriptionSchema);

module.exports = UserSubscription;
