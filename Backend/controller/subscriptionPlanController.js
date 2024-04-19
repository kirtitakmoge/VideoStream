const SubscriptionPlan = require("../models/SubscriptionPlan");
const { isValidObjectId } = require("mongoose");


// Controller for handling CRUD operations on subscription plans
const subscriptionPlanController = {
  // Create a new subscription plan
  createPlan: async (req, res) => {
    try {
      const plan = new SubscriptionPlan(req.body);
      await plan.save();
      res.status(201).send(plan);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Get all subscription plans
  getAllPlans: async (req, res) => {
    try {
      const plans = await SubscriptionPlan.find();
      console.log(plans);
      res.status(200).json(plans);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Get a single subscription plan by ID
  getPlanById: async (req, res) => {
    try {
      const planId = req.params.planId;
      if (!isValidObjectId(planId)) {
        return res.status(400).json({ error: "Invalid PlanId" });
      }
      const plan = await SubscriptionPlan.findById(planId);
      if (!plan) {
        return res.status(404).send({ message: "Plan not found" });
      }
      res.send(plan);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },

  // Update a subscription plan by ID
  updatePlanById: async (req, res) => {
    try {
      const planId = req.params.planId;
      if (!isValidObjectId(planId)) {
        return res.status(400).json({ error: "Invalid PlanId" });
      }
      const plan = await SubscriptionPlan.findByIdAndUpdate(planId, req.body, {
        new: true,
      });
      if (!plan) {
        return res.status(404).send({ message: "Plan not found" });
      }
      res.send(plan);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  },

  // Delete a subscription plan by ID
  deletePlanById: async (req, res) => {
    try {
      const planId = req.params.planId;
      if (!isValidObjectId(planId)) {
        return res.status(400).json({ error: "Invalid PlanId" });
      }
      const plan = await SubscriptionPlan.findByIdAndDelete(planId);
      if (!plan) {
        return res.status(404).send({ message: "Plan not found" });
      }
      res.send(plan);
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  },
};

module.exports = subscriptionPlanController;
