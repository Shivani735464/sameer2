import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// 🔹 Signup Controller
export const registerUser = async (req, res) => {
  const {
    name,
    phone,
    email,
    colonyName,
    streetName,
    houseNumber,
    city,
    nearbyLandmark,
  } = req.body;

  const profilePic = req.file ? req.file.path : null; // Cloudinary URL milti hai yahan

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({
      name,
      phone,
      email,
      profilePic,
      colonyName,
      streetName,
      houseNumber,
      city,
      nearbyLandmark,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Login (by name + phone)
export const loginUser = async (req, res) => {
  const { name, phone } = req.body;

  try {
    const user = await User.findOne({ name, phone });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 Get Profile (Protected)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};