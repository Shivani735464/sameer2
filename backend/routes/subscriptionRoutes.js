import express from "express";
import { createSubscription, getUserSubscriptions } from "../controllers/subscriptionController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Only logged-in users can create subscription
router.post("/", protect, createSubscription);

// Get subscriptions of logged-in user
router.get("/my", protect, getUserSubscriptions);

export default router;