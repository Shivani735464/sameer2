// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phone: { type: String, required: true, unique: true },
//     email: { type: String },
//     profilePic: { type: String },
//     colonyName: { type: String },
//     streetName: { type: String },
//     houseNumber: { type: String },
//     city: { type: String },
//     nearbyLandmark: { type: String },
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;




import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    email: { type: String },
    profilePic: { type: String },

    // Address fields (manual or from reverse-geocode)
    colonyName: { type: String },
    streetName: { type: String },
    houseNumber: { type: String },
    city: { type: String },
    nearbyLandmark: { type: String },

    // GeoJSON location (longitude, latitude)
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: undefined,
      },
    },

    // optional convenience fields (not necessary but easy)
    latitude: { type: Number },
    longitude: { type: Number },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" }); // create 2dsphere index

const User = mongoose.model("User", userSchema);
export default User;