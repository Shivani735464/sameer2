import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  updateUser,
} from "../controllers/userController.js";
import upload from "../utils/multerConfig.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", upload.single("profilePic"), registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getProfile);
router.patch("/update", protect, updateUser)

export default router;