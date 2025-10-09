// import jwt from "jsonwebtoken";
// import cloudinary from "cloudinary";
// import User from "../models/userModel.js";

// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
// };

// // 🔹 Signup Controller
// export const registerUser = async (req, res) => {
//   const {
//     name,
//     phone,
//     email,
//     colonyName,
//     streetName,
//     houseNumber,
//     city,
//     nearbyLandmark,
//   } = req.body;

//   const profilePic = req.file ? req.file.path : null; // Cloudinary URL milti hai yahan

//   try {
//     const existingUser = await User.findOne({ phone });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({
//       name,
//       phone,
//       email,
//       profilePic,
//       colonyName,
//       streetName,
//       houseNumber,
//       city,
//       nearbyLandmark,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       phone: user.phone,
//       profilePic: user.profilePic,
//       token: generateToken(user._id),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔹 Login (by name + phone)
// export const loginUser = async (req, res) => {
//   const { name, phone } = req.body;

//   try {
//     const user = await User.findOne({ name, phone });
//     if (!user) return res.status(400).json({ message: "Invalid credentials" });

//     res.json({
//       _id: user._id,
//       name: user.name,
//       phone: user.phone,
//       profilePic: user.profilePic,
//       token: generateToken(user._id),
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🔹 Get Profile (Protected)
// export const getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// export const updateUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndUpdate(req.user._id, req.body, {
//       new: true,
//     });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: "Update failed" });
//   }
// };




import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// Signup Controller
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
    latitude,
    longitude,
  } = req.body;

  // profilePic path from multer/cloudinary
  const profilePic = req.file ? req.file.path : null;

  // Basic validation
  if (!name || !phone) {
    return res.status(400).json({ message: "Name and phone are required." });
  }

  try {
    const existingUser = await User.findOne({ phone });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const userData = {
      name,
      phone,
      email,
      profilePic,
      colonyName,
      streetName,
      houseNumber,
      city,
      nearbyLandmark,
    };

    // If coordinates provided, put into GeoJSON location and lat/lng fields
    if (latitude && longitude) {
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        userData.location = { type: "Point", coordinates: [lng, lat] };
        userData.latitude = lat;
        userData.longitude = lng;
      }
    }

    const user = await User.create(userData);

    res.status(201).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      profilePic: user.profilePic,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// loginUser, getProfile, updateUser remain — but updateUser should allow updating location fields
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

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updates = { ...req.body };

    // handle coords if provided
    if (updates.latitude && updates.longitude) {
      const lat = parseFloat(updates.latitude);
      const lng = parseFloat(updates.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        updates.location = { type: "Point", coordinates: [lng, lat] };
        updates.latitude = lat;
        updates.longitude = lng;
      }
    }

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
    });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
};