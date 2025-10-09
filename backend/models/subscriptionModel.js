import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // link to user
    planId: { type: Number, required: true },
    planName: { type: String, required: true },
    price: { type: Number, required: true },
    labour: { type: Number, required: true },
    comingCharge: { type: Number, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    message: { type: String }, // optional user message
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;