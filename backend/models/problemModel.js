import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    category: { type: String }, // e.g. plumbing, electrician, painting
    description: { type: String },
    keywords: [{ type: String }], // useful for search
    basePrice: { type: Number, required: true, default: 0 }, // cost to fix
    visitCharge: { type: Number, required: true, default: 0 }, // charge for coming
    image: { type: String }, // optional image URL
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Problem = mongoose.model("Problem", problemSchema);
export default Problem;