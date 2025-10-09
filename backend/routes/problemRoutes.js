import express from "express";
import { listProblems, selectProblem, getUserHistory } from "../controllers/problemController.js";
import protect from "../middleware/authMiddleware.js";
import Problem from "../models/problemModel.js";

const router = express.Router();

// public
router.get("/", listProblems);

// protected (user actions)
router.post("/select", protect, selectProblem);
router.get("/history", protect, getUserHistory);

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q?.trim();
    if (!query) return res.status(400).json({ message: "Query required" });

    // Search title, category, description, or keywords
    const problems = await Problem.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { keywords: { $in: [new RegExp(query, "i")] } },
      ],
    });

    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;