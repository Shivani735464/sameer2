import Subscription from "../models/subscriptionModel.js";

// Create subscription
export const createSubscription = async (req, res) => {
  try {
    const { planId, planName, price, labour, comingCharge, name, phone, message } = req.body;

    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    if (!planId || !planName || !price || !labour || !name || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const subscription = await Subscription.create({
      userId: req.user._id, // save user id
      planId,
      planName,
      price,
      labour,
      comingCharge,
      name,
      phone,
      message,
    });

    res.status(201).json({ message: "Subscription created successfully", subscription });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Optional: Get all subscriptions for logged-in user
export const getUserSubscriptions = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Not authorized" });

    const subscriptions = await Subscription.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};