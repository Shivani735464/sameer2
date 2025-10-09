import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { FaEdit, FaSave, FaCamera, FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { HelpCircle } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const { user, setUser, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
    colonyName: user?.colonyName || "",
    streetName: user?.streetName || "",
    houseNumber: user?.houseNumber || "",
    city: user?.city || "",
    nearbyLandmark: user?.nearbyLandmark || "",
    profilePic: user?.profilePic || "",
  });

  const [changedFields, setChangedFields] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setChangedFields({ ...changedFields, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "labourapp_preset");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload",
        data
      );
      setForm({ ...form, profilePic: res.data.secure_url });
      setChangedFields({ ...changedFields, profilePic: res.data.secure_url });
    } catch (err) {
      console.error(err);
      alert("Image upload failed");
    }
  };

//  const handleSave = async () => {
//   if (!user?.token) {
//     alert("Session expired. Please login again.");
//     return;
//   }

//   const changedFields = {};
//   Object.keys(form).forEach((key) => {
//     if (form[key] !== user[key]) changedFields[key] = form[key];
//   });

//   try {
//     const res = await axios.patch(
//       "http://localhost:5000/api/users/update",
//       changedFields,
//       { headers: { Authorization: `Bearer ${user.token}` } }
//     );
//     alert("Profile updated successfully!");
//     // update localStorage with new info
//     const updatedUser = { ...user, ...changedFields };
//     setUser(updatedUser);
//     localStorage.setItem("labourUser", JSON.stringify(updatedUser));
//   } catch (err) {
//     console.error(err);
//     alert("Update failed: " + err.response?.data?.message);
//   }
// };

const handleSave = async () => {
  // Define required fields (aap edit mode me sirf address fields allow kar rahe ho)
  const requiredFields = ["email", "colonyName", "streetName", "houseNumber", "city", "nearbyLandmark"];
  
  // Check if any required field is empty
  for (let field of requiredFields) {
    if (!form[field]?.trim()) {
      alert(`Please fill in the ${field}`);
      return; // stop save if any field is empty
    }
  }

  if (!user?.token) {
    alert("Session expired. Please login again.");
    return;
  }

  const changedFields = {};
  Object.keys(form).forEach((key) => {
    if (form[key] !== user[key]) changedFields[key] = form[key];
  });

  try {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_BASE_URL}/api/users/update`,
      changedFields,
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    alert("Profile updated successfully!");
    const updatedUser = { ...user, ...changedFields };
    setUser(updatedUser);
    localStorage.setItem("labourUser", JSON.stringify(updatedUser));
    setIsEditing(false);
  } catch (err) {
    console.error(err);
    alert("Update failed: " + err.response?.data?.message);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center pt-12 pb-8 px-4">
      {/* Compact Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-xl mt-9 p-4 flex items-center gap-4">
        {/* Profile Image */}
        <div className="relative w-20 h-20 flex-shrink-0">
          <img
            src={form.profilePic || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-2 border-blue-100 shadow-sm"
          />
          {isEditing && (
            <>
              {/* <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full text-white cursor-pointer hover:bg-blue-700"
              >
                <FaCamera className="text-sm" />
              </label> */}
              <input
                id="profilePic"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </>
          )}
        </div>

        {/* Name & Phone (read-only) */}
        <div className="flex-1 text-left">
          <h2 className="text-lg font-semibold text-gray-800">{form.name}</h2>
          <p className="text-gray-500 text-sm">{form.phone}</p>

          {/* Address fields editable only in edit mode */}
          {isEditing && (
            <div className="mt-2 flex flex-col gap-2 text-sm">
              {[
                { label: "Email", name: "email" },
                { label: "Colony", name: "colonyName" },
                { label: "Street", name: "streetName" },
                { label: "House No.", name: "houseNumber" },
                { label: "City", name: "city" },
                { label: "Nearby Landmark", name: "nearbyLandmark" },
              ].map((field, idx) => (
                <input
                  key={idx}
                  type="text"
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-400 outline-none transition"
                  placeholder={field.label}
                />
              ))}
            </div>
          )}
        </div>

        {/* Edit / Save */}
       <div className="flex flex-col gap-2">
  {isEditing ? (
    <>
      {/* Save Button */}
      <button
        onClick={handleSave}
        className="text-blue-500 hover:text-blue-700 text-xl"
      >
        <FaSave />
      </button>

      {/* Back Button */}
      <button
        onClick={() => setIsEditing(false)}
        className="bg-white/80 fixed top-24 right-7 backdrop-blur-md p-1 rounded-full shadow-md hover:scale-105 transition-all border border-gray-200"
      >
        <FaArrowLeft className="text-xl text-blue-400" />
      </button>
    </>
  ) : (
    // Edit button (normal mode)
    <button
      onClick={() => setIsEditing(true)}
      className="text-blue-500 hover:text-blue-700 text-xl"
    >
      <FaEdit />
    </button>
  )}
</div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="mt-6 fixed bottom-20 w-[92%] max-w-xl border-2 bg-red-400 border-red-400 text-white py-2 rounded-lg hover:bg-red-700 transition"
      >
        Logout
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
       
    </div>
  );
};

export default Profile;