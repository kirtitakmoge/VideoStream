const UserSubscription = require("../models/UserSubscription");
const SubscriptionPlan = require('../models/SubscriptionPlan');
const { isValidObjectId } = require("mongoose");

// Create a Subscription
exports.createSubscription = async (req, res) => {
    try {
        const userId = req.params.userId;
        const subscription = req.body;

        // Validate subscription ID
        if (!subscription.subscriptionId) {
            return res.status(400).json({ error: 'Subscription ID is required' });
        }
console.log(userId);
console.log(subscription)
        // Find the subscription plan
        const subscriptionPlan = await SubscriptionPlan.findById(subscription.subscriptionId);
        if (!subscriptionPlan) {
            return res.status(404).json({ error: 'Subscription plan not found' });
        }

        // Calculate endDate based on subscription plan duration
        const durationInMilliseconds = subscriptionPlan.duration * 24 * 60 * 60 * 1000; // Assuming duration is specified in days
        const startDate = new Date();
        const endDate = new Date(startDate.getTime() + durationInMilliseconds);

        // Create new subscription
        const newSubscription = new UserSubscription({
            userId: userId,
            subscriptionId: subscriptionPlan._id,
            startDate: startDate,
            endDate: endDate,
            status: 'Active',
            usedData: 0, // Assuming initial usage is zero
            remainingData: subscriptionPlan.dataLimit || 0 // Assuming subscription plan has a data limit
        });

        // Save the subscription to the database
        await newSubscription.save();

        // Return success response
        res.status(201).json(newSubscription);
    } catch (error) {
        // Handle errors
        console.error('Error creating subscription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get a Subscription by ID
exports.getSubscriptionById = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;

        // Check if subscription ID is valid
        if (!isValidObjectId(subscriptionId)) {
            return res.status(400).json({ error: 'Subscription ID is not valid' });
        }

        // Find subscription by ID
        const subscription = await UserSubscription.findById(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        // Return subscription details
        res.status(200).json(subscription);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving subscription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Get All Subscriptions
exports.getAllSubscriptions = async (req, res) => {
    try {
        // Retrieve all subscriptions from the database
        const subscriptions = await UserSubscription.find();
        console.log(subscriptions);
        res.status(200).json(subscriptions);
    } catch (error) {
        // Handle errors
        console.error('Error retrieving subscriptions:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Update a Subscription by ID
exports.updateSubscriptionById = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;
        const updates = req.body;

        // Check if subscription ID is valid
        if (!isValidObjectId(subscriptionId)) {
            return res.status(400).json({ error: 'Subscription ID is not valid' });
        }

        // Find subscription by ID
        const subscription = await UserSubscription.findByIdAndUpdate(subscriptionId,updates,{new:true});
              if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        

        // Return updated subscription
        res.status(200).json(subscription);
    } catch (error) {
        // Handle errors
        console.error('Error updating subscription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

// Delete a Subscription by ID
exports.deleteSubscriptionById = async (req, res) => {
    try {
        const subscriptionId = req.params.subscriptionId;

        // Check if subscription ID is valid
        if (!isValidObjectId(subscriptionId)) {
            return res.status(400).json({ error: 'Subscription ID is not valid' });
        }

        // Find subscription by ID and delete it
        const subscription = await UserSubscription.findByIdAndDelete(subscriptionId);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found' });
        }

        // Return success message
        res.status(200).json({ message: 'Subscription deleted successfully' });
    } catch (error) {
        // Handle errors
        console.error('Error deleting subscription:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
