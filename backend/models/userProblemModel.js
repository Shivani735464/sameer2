import mongoose from "mongoose";

const userProblemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    problem: { type: mongoose.Schema.Types.ObjectId, ref: "Problem", required: true },
    priceQuoted: { type: Number, required: true }, // basePrice
    visitCharge: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "selected" }, // selected / scheduled / done
    note: { type: String },
  },
  { timestamps: true }
);

const UserProblem = mongoose.model("UserProblem", userProblemSchema);
export default UserProblem;