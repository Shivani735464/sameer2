import express from "express";
import { listProblems, selectProblem, getUserHistory } from "../controllers/problemController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// public
router.get("/", listProblems);

// protected (user actions)
router.post("/select", protect, selectProblem);
router.get("/history", protect, getUserHistory);

export default router;