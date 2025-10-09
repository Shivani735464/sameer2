import Problem from "../models/problemModel.js";
import UserProblem from "../models/userProblemModel.js";
import User from "../models/userModel.js";

// GET /api/problems?search=...&category=...
export const listProblems = async (req, res) => {
  try {
    const { search, category } = req.query;
    const filter = { active: true };

    if (category) filter.category = category;

    if (search) {
      const regex = new RegExp(search, "i");
      filter.$or = [
        { title: regex },
        { description: regex },
        { keywords: regex },
      ];
    }

    const problems = await Problem.find(filter).limit(100).sort({ title: 1 });
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/user/problems  (protected) → add a selection to history
export const selectProblem = async (req, res) => {
  try {
    const userId = req.user._id;
    const { problemId, note } = req.body;
    if (!problemId) return res.status(400).json({ message: "problemId required" });

    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ message: "Problem not found" });

    const priceQuoted = problem.basePrice;
    const visitCharge = problem.visitCharge;
    const totalPrice = priceQuoted + visitCharge;

    const userProblem = await UserProblem.create({
      user: userId,
      problem: problem._id,
      priceQuoted,
      visitCharge,
      totalPrice,
      note: note || "",
    });

    res.status(201).json(userProblem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/user/history (protected)
export const getUserHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const records = await UserProblem.find({ user: userId })
      .populate("problem")
      .sort({ createdAt: -1 });
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};




export const searchProblemByVoice = async (req, res) => {
  try {
    const { query } = req.body; // user voice converted text

    if (!query) {
      return res.status(400).json({ message: "Query missing" });
    }

    console.log("🔍 Voice Query Received:", query);

    const regex = new RegExp(query, "i"); // case-insensitive search

    const results = await Problem.find({
      $or: [{ title: regex }, { category: regex }, { description: regex }],
    });

    if (results.length === 0) {
      return res.status(404).json({ message: "No matching problems found" });
    }

    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("❌ Error in voice search:", error);
    res.status(500).json({ message: "Server error" });
  }
};