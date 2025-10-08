import mongoose from "mongoose";
import dotenv from "dotenv";
import Problem from "./models/problemModel.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

const problems = [
  {
    title: "Leaky Faucet Repair",
    category: "plumbing",
    description: "Fix leaking taps, replace washers or cartridges.",
    keywords: ["tap", "leak", "faucet", "plumbing"],
    basePrice: 300,
    visitCharge: 50,
  },
  {
    title: "Toilet Unclogging",
    category: "plumbing",
    description: "Unclog toilet, remove blockages.",
    keywords: ["toilet", "clog", "plumbing"],
    basePrice: 400,
    visitCharge: 50,
  },
  {
    title: "Wall Painting - Small Room",
    category: "painting",
    description: "Paint small room up to 100 sq ft (materials extra).",
    keywords: ["paint", "painting", "wall"],
    basePrice: 1500,
    visitCharge: 100,
  },
  {
    title: "Electric Switch/Socket Repair",
    category: "electrician",
    description: "Replace or repair switches and sockets.",
    keywords: ["electric", "switch", "socket", "repair"],
    basePrice: 250,
    visitCharge: 50,
  },
  // add many more...
];

const run = async () => {
  await Problem.deleteMany({});
  await Problem.insertMany(problems);
  console.log("Seeded problems");
  process.exit();
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});