// import { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { HelpCircle } from "lucide-react";

// const images = [
//   "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
//   "https://images.unsplash.com/photo-1607746882042-944635dfe10e",
//   "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
//   "https://images.unsplash.com/photo-1506765515384-028b60a970df",
// ];

// const Signup = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [form, setForm] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     colonyName: "",
//     streetName: "",
//     houseNumber: "",
//     city: "",
//     nearbyLandmark: "",
//     profilePic: null,
//   });

//   useEffect(() => {
//     document.body.style.fontFamily = "'Rajdhani', sans-serif";
//     const fontLink = document.createElement("link");
//     fontLink.href =
//       "https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;600;700&display=swap";
//     fontLink.rel = "stylesheet";
//     document.head.appendChild(fontLink);
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === "profilePic") setForm({ ...form, profilePic: files[0] });
//     else setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     Object.entries(form).forEach(([key, value]) => formData.append(key, value));

//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_API_BASE_URL}/api/users/signup`,
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//         }
//       );
//       login(data);
//       navigate("/hero");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen w-full bg-gradient-to-b from-white to-gray-100 text-white overflow-hidden">
//       {/* 🔹 Top 75% - Infinite Scroll Background with Form */}
//       <div className="relative h-[75%] w-full overflow-hidden">
//         <div className="absolute top-0 left-0 flex w-[200%] h-full animate-scroll">
//           {[...images, ...images].map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt={`slide-${i}`}
//               className="w-1/4 sm:w-1/5 h-full object-cover flex-shrink-0"
//             />
//           ))}
//         </div>

//         {/* 🔹 Scrollable Form */}
//         <form
//           onSubmit={handleSubmit}
//           className="absolute top-18 z-10 left-1/2 transform -translate-x-1/2 flex flex-col gap-3 w-11/12 max-w-sm
//                      px-6 py-6 rounded-2xl bg-white/30 backdrop-blur-md border border-gray-300
//                      max-h-[85%] overflow-y-auto scrollbar-none"
//           style={{
//             scrollbarWidth: "none", // Firefox
//             msOverflowStyle: "none", // IE 10+
//           }}
//         >
//           <style>
//             {`
//               form::-webkit-scrollbar {
//                 display: none;
//               }
//             `}
//           </style>

//           <input
//             name="name"
//             placeholder="Name"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//             required
//           />
//           <input
//             name="phone"
//             placeholder="Phone"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//             required
//           />
//           <input
//             name="email"
//             placeholder="Email (optional)"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//           />
//           <input
//             name="colonyName"
//             placeholder="Colony"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//           />
//           <input
//             name="streetName"
//             placeholder="Street"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//           />
//           <input
//             name="houseNumber"
//             placeholder="House Number"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//           />
//           <input
//             name="city"
//             placeholder="City"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//           />
//           <input
//             name="nearbyLandmark"
//             placeholder="Nearby Landmark"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-center text-white/40 backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-white font-[Rajdhani]"
//           />
//           <input
//             type="file"
//             name="profilePic"
//             onChange={handleChange}
//             className="p-3 rounded border border-gray-300 text-white backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-blue-400 file:mr-3 file:py-1 file:px-3 file:border-0 file:rounded file:bg-blue-600 file:text-white cursor-pointer font-[Rajdhani]"
//           />
//         </form>
//       </div>
//       <button
//         onClick={() => alert("Contact support at support@example.com")}
//         className="fixed z-10 top-5 right-4 flex items-center gap-2 bg-white backdrop-blur-md px-1 py-1 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all font-[Rajdhani]"
//       >
//         <HelpCircle className="w-5 h-5 text-gray-700" />
//         {/* <span className="text-gray-800 font-semibold text-sm sm:text-base">
//                    Help
//                  </span> */}
//       </button>
//       {/* 🔹 Bottom 25% - Card Section */}
//       <div className="h-[25%] flex justify-center items-center p-3 bg-white">
//         <div className="relative flex flex-row sm:flex-row items-center justify-between p-4 sm:p-6 w-[95%] sm:w-[85%] md:w-[70%] transition-all duration-300">
//           {/* Left Side */}
//           <div className="flex-1 flex flex-col justify-center text-center sm:text-left gap-1 font-[Rajdhani]">
//             <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
//               Create your free Account
//             </h2>
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               className="bg-gradient-to-r from-green-600/60 to-emerald-500/70 text-white px-8 py-2 rounded-xl shadow-md hover:shadow-lg hover:scale-105 transition-all font-semibold"
//             >
//               Register
//             </button>
//           </div>

//           {/* Right Side - Image */}
//           <div className="flex-1 flex justify-center sm:justify-end">
//             <img
//               src="https://images.unsplash.com/photo-1607746882042-944635dfe10e"
//               alt="signup"
//               className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-2xl shadow-lg border border-gray-300 hover:scale-105 transition-transform duration-300"
//             />
//           </div>
//         </div>
//       </div>

//       {/* 🔹 Infinite Scroll Animation */}
//       <style>{`
//         @keyframes scroll {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-50%); }
//         }
//         .animate-scroll {
//           animation: scroll 20s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Signup;

import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { HelpCircle } from "lucide-react";

// 🗺️ Fix leaflet icon URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// 🔹 Backend reverse geocoding fetch
const ReverseGeocode = async (lat, lng) => {
  try {
    const res = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/api/location/reverse?lat=${lat}&lon=${lng}`
    );
    if (!res.ok) throw new Error("Reverse geocoding failed");
    return await res.json();
  } catch (err) {
    console.error("Reverse geocode error:", err);
    return null;
  }
};

// 📍 Marker component (draggable)
const DraggableMarker = ({ position, setPosition }) => {
  const markerRef = useRef(null);
  useMapEvents({}); // enable map events (needed for Leaflet)

  useEffect(() => {
    if (!markerRef.current) return;
    const marker = markerRef.current;
    marker.on("dragend", () => {
      const latlng = marker.getLatLng();
      setPosition([latlng.lat, latlng.lng]);
    });
  }, [setPosition]);

  return <Marker draggable position={position} ref={markerRef} />;
};

export default function Signup() {
  const [mode, setMode] = useState("manual"); // manual or live
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [position, setPosition] = useState([21.146633, 79.08886]); // Default: Nagpur
  const [mapZoom, setMapZoom] = useState(13);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    colonyName: "",
    streetName: "",
    houseNumber: "",
    city: "",
    nearbyLandmark: "",
  });

  const [profileFile, setProfileFile] = useState(null);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  // 📌 Handle input changes
  const handleChange = (e) => {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  // 🌍 Fetch live location + address
  const useMyLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    setError(null);
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setPosition([lat, lng]);
        setMapZoom(16);

        const data = await ReverseGeocode(lat, lng);
        if (data && data.address) {
          const a = data.address;
          setForm((s) => ({
            ...s,
            city: a.city || a.town || a.village || a.county || s.city,
            colonyName: a.neighbourhood || a.suburb || s.colonyName,
            streetName: a.road || s.streetName,
            nearbyLandmark: a.attraction || a.building || s.nearbyLandmark,
          }));
        }

        setLoadingLocation(false);
        setMode("live");
      },
      (err) => {
        console.error(err);
        setError("Unable to fetch location. Please allow location access.");
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // 📤 Submit signup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!form.name || !form.phone) {
      setError("Please enter name and phone (required).");
      return;
    }

    const data = new FormData();
    data.append("name", form.name);
    data.append("phone", form.phone);
    if (form.email) data.append("email", form.email);
    data.append("colonyName", form.colonyName || "");
    data.append("streetName", form.streetName || "");
    data.append("houseNumber", form.houseNumber || "");
    data.append("city", form.city || "");
    data.append("nearbyLandmark", form.nearbyLandmark || "");

    // Add live coordinates if in live mode
    if (mode === "live" && position) {
      const [lat, lng] = position;
      data.append("latitude", lat);
      data.append("longitude", lng);
    }

    if (profileFile) {
      data.append("profilePic", profileFile);
    }

    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/signup`, {
        method: "POST",
        body: data,
      });

      const json = await res.json();
      setLoading(false);
      if (!res.ok) {
        setError(json.message || "Signup failed");
        return;
      }
      setSuccessMsg("Signup successful..");
      setTimeout(() => navigate("/login"), 500);
    } catch (err) {
      console.error(err);
      setError("Request failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-7 p-4 space-y-6">

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-6"
      >
        {/* Basic Info */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Name *
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Phone *
          </label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        {/* Profile Picture */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">
            Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfileFile(e.target.files?.[0])}
          />
        </div>

        <hr className="my-2" />

        {/* Live Location */}
        <div className="space-y-2">
          <strong className="text-gray-700">Address</strong>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={mode === "live"}
                onChange={useMyLocation}
                className="accent-blue-500"
              />
              Use my live location
            </label>
            <button
              type="button"
              onClick={useMyLocation}
              disabled={loadingLocation}
              className="px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {loadingLocation ? "Getting location..." : "Done"}
            </button>
          </div>
        </div>

        {/* Address Inputs */}
        <div className="space-y-2">
          <label className="block text-gray-700">Colony / Neighbourhood</label>
          <input
            name="colonyName"
            value={form.colonyName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <label className="block text-gray-700">Street / Road</label>
          <input
            name="streetName"
            value={form.streetName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <label className="block text-gray-700">House / Flat No.</label>
          <input
            name="houseNumber"
            value={form.houseNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <label className="block text-gray-700">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
          <label className="block text-gray-700">Nearby Landmark</label>
          <input
            name="nearbyLandmark"
            value={form.nearbyLandmark}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white transition ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-700"
          }`}
        >
          {loading ? "Signing up..." : "Signup"}
        </button>
         <button
          onClick={() => alert("Contact support at support@example.com")}
          className="fixed z-10 top-5 right-4 flex items-center gap-2 bg-white backdrop-blur-md px-1 py-1 rounded-full shadow-md hover:bg-white hover:scale-105 transition-all font-[Rajdhani]"
        >
          <HelpCircle className="w-5 h-5 text-gray-700" />
          {/* <span className="text-gray-800 font-semibold text-sm sm:text-base">
            Help
          </span> */}
        </button>
      </form>

      {/* Live Map */}
      {mode === "live" && (
        <div className="mt-4">
          <h4 className="font-semibold text-gray-700 mb-2">
            Your location (drag marker to adjust)
          </h4>
          <div className="h-64 w-full rounded-xl overflow-hidden shadow-md">
            <MapContainer
              center={position}
              zoom={mapZoom}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <DraggableMarker
                position={position}
                setPosition={async (newPos) => {
                  setPosition(newPos);
                  const data = await ReverseGeocode(newPos[0], newPos[1]);
                  if (data && data.address) {
                    const a = data.address;
                    setForm((s) => ({
                      ...s,
                      city: a.city || a.town || a.village || a.county || s.city,
                      colonyName: a.neighbourhood || a.suburb || s.colonyName,
                      streetName: a.road || s.streetName,
                      nearbyLandmark:
                        a.attraction || a.building || s.nearbyLandmark,
                    }));
                  }
                }}
              />
            </MapContainer>

            <div className="mt-2 text-gray-500 text-sm">
              Coordinates: lat {position[0].toFixed(6)}, lng{" "}
              {position[1].toFixed(6)}
            </div>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {error && <div className="text-red-600 mt-2">{error}</div>}
      {successMsg && <div className="text-green-600 mt-2">{successMsg}</div>}
    </div>
  );
}
