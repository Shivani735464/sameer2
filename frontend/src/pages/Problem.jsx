// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const Problem = () => {
//   const { user } = useAuth();
//   const [query, setQuery] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   const fetchProblems = async (search = "") => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/problems", {
//         params: { search },
//       });
//       setResults(res.data);
//     } catch (err) {
//       console.error(err);
//       setMsg("Unable to load problems");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProblems();
//   }, []);

//   // search on input change (debounce)
//   useEffect(() => {
//     const t = setTimeout(() => fetchProblems(query), 400);
//     return () => clearTimeout(t);
//   }, [query]);

//   const selectProblem = async (problemId) => {
//     try {
//       const token = user?.token;
//       if (!token) return alert("Please login first");
//       const res = await axios.post(
//         "http://localhost:5000/api/problems/select",
//         { problemId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       alert("Problem added to your history");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to select problem");
//     }
//   };

//   return (
//     <div className="pt-16 pb-24 px-4">
//       <h2 className="text-2xl font-semibold mb-4">Find a Problem</h2>

//       <input
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search problems, e.g. 'leak', 'paint', 'electric'"
//         className="w-full p-3 rounded-lg border mb-4"
//       />

//       {loading && <p>Loading...</p>}
//       {msg && <p className="text-red-500">{msg}</p>}

//       <div className="flex flex-col gap-4">
//         {results.map((p) => (
//           <div key={p._id} className="bg-white p-4 rounded-xl shadow flex items-start gap-4">
//             {p.image ? (
//               <img src={p.image} alt={p.title} className="w-20 h-20 rounded-lg object-cover" />
//             ) : (
//               <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center text-sm">No Image</div>
//             )}

//             <div className="flex-1 text-left">
//               <h3 className="font-semibold">{p.title}</h3>
//               <p className="text-sm text-gray-500">{p.description}</p>
//               <div className="mt-2 flex items-center gap-3 text-sm">
//                 <span className="font-semibold">Fix: ₹{p.basePrice}</span>
//                 <span className="text-gray-400">Visit: ₹{p.visitCharge}</span>
//               </div>
//             </div>

//             <div className="flex flex-col items-end gap-2">
//               <button
//                 onClick={() => selectProblem(p._id)}
//                 className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//               >
//                 Select
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Problem;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import VoiceSearch from "../components/VoiceSearch";

const Problem = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch problems
  const fetchProblems = async (search = "", category = "") => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/problems`, {
        params: { search, category },
      });
      const problems = res.data;

      // 🧠 Extract unique categories from problems
      const uniqueCategories = [
        ...new Set(problems.map((p) => p.category).filter(Boolean)),
      ];
      setCategories(uniqueCategories);

      setResults(problems);
    } catch (err) {
      console.error(err);
      setMsg("Unable to load problems");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  // ✅ Debounce search
  useEffect(() => {
    const t = setTimeout(() => fetchProblems(query, selectedCategory), 400);
    return () => clearTimeout(t);
  }, [query, selectedCategory]);

  const selectProblem = async (problemId) => {
    try {
      const token = user?.token;
      if (!token) return alert("Please login first");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/problems/select`,
        { problemId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Problem added to your history");
    } catch (err) {
      console.error(err);
      alert("Failed to select problem");
    }
  };

  return (
   <div className="pt-12 pb-24 px-4 bg-gray-50 min-h-screen">
  {/* 🔹 Header */}
  <div className="flex items-center justify-between mb-6">
    
    <button
      onClick={() => navigate("/total")}
      className="fixed right-5 top-3 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:scale-105 transition-all border border-gray-200"
    >
      <FaShoppingCart className="text-xl text-blue-400" />
    </button>
  </div>
<h2 className="text-2xl font-semibold mt-1 mb-3">YOUR PROBLEMS</h2>
 <VoiceSearch onResults={(data) => setProblems(data)} />
  {/* 🔹 Search + Filter */}
  <div className="flex items-center gap-3 mb-6 rounded-xl border-gray-200">
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search problems (e.g. leak, paint, electric)"
      className="flex-1 p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-sm"
    />
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white text-sm"
    >
      <option value="">All</option>
      {categories.map((cat, i) => (
        <option key={i} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  </div>

  {/* 🔹 Results Section */}
  {loading && <p className="text-gray-500">Loading problems...</p>}
  {msg && <p className="text-red-500">{msg}</p>}

  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {results.map((p) => {
      const total = (p.basePrice || 0) + (p.visitCharge || 0);
      return (
        <div
          key={p._id}
          className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100"
        >
          <img
            src={
              p.image ||
              "https://cdn.pixabay.com/photo/2024/05/09/14/58/ai-generated-8751231_640.png"
            }
            alt={p.title}
            className="w-full h-36 object-cover"
          />
          <div className="p-4 text-left">
            <h3 className="font-semibold text-base text-gray-800 leading-snug break-words">
              {p.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1 leading-relaxed break-words">
              {p.description || "No description available."}
            </p>
            <div className="mt-3 text-sm flex flex-col gap-1">
              <span className="font-semibold text-blue-600">
                Fix Charge: ₹{p.basePrice}
              </span>
              <span className="text-gray-500">Visit Charge: ₹{p.visitCharge}</span>
              <span className="text-green-600 font-semibold">
                Total: ₹{total}
              </span>
            </div>
            <button
              onClick={() => selectProblem(p._id)}
              className="mt-4 w-full border-2 border-blue-500 text-blue-700 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm"
            >
              Select Problem
            </button>
          </div>
        </div>
      );
    })}
  </div>

  {!loading && results.length === 0 && (
    <p className="text-center text-gray-500 mt-8">
      No problems found. Try a different search or category.
    </p>
  )}
</div>
  );
};

export default Problem;