import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    profilePic: { type: String },
    colonyName: { type: String },
    streetName: { type: String },
    houseNumber: { type: String },
    city: { type: String },
    nearbyLandmark: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;