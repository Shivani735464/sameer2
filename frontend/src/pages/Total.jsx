// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";

// const Total = () => {
//   const { user } = useAuth();
//   const [records, setRecords] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const fetchHistory = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("http://localhost:5000/api/problems/history", {
//         headers: { Authorization: `Bearer ${user?.token}` },
//       });
//       setRecords(res.data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (user) fetchHistory();
//   }, [user]);

//   return (
//     <div className="pt-16 pb-24 px-4">
//       <h2 className="text-2xl font-semibold mb-4">Your Records</h2>
//       {loading && <p>Loading...</p>}
//       <div className="flex flex-col gap-4">
//         {records.map((r) => (
//           <div key={r._id} className="bg-white p-4 rounded-xl shadow flex items-start gap-4">
//             <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
//               {r.problem?.image ? (
//                 <img src={r.problem.image} alt={r.problem.title} className="w-16 h-16 object-cover rounded-lg" />
//               ) : (
//                 <span className="text-xs text-gray-500">No Image</span>
//               )}
//             </div>

//             <div className="flex-1 text-left">
//               <h3 className="font-semibold">{r.problem?.title}</h3>
//               <p className="text-sm text-gray-500">{r.problem?.description}</p>
//               <div className="mt-2 text-sm text-gray-600">
//                 <span>Quoted: ₹{r.priceQuoted} &nbsp; Visit: ₹{r.visitCharge}</span>
//                 <div className="text-xs text-gray-400">Selected on: {new Date(r.createdAt).toLocaleString()}</div>
//               </div>
//             </div>

//             <div className="text-right">
//               <div className="font-semibold">Total</div>
//               <div className="text-lg font-bold">₹{r.totalPrice}</div>
//               <div className="text-xs text-gray-400">{r.status}</div>
//             </div>
//           </div>
//         ))}
//         {records.length === 0 && !loading && <p className="text-gray-500">No records yet.</p>}
//       </div>
//     </div>
//   );
// };

// export default Total;







import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Total = () => {
  const { user } = useAuth();
     const navigate = useNavigate();
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);


  const fetchHistory = async () => {
    
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/problems/history`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      });
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchHistory();
  }, [user]);

  // ✅ Common image for all records
  const commonImage = "https://cdn.pixabay.com/photo/2021/08/09/23/26/history-6534506_640.png";

  return (
  <div className="pt-16 pb-24 px-4">
  <h2 className="text-2xl font-semibold mt-2 mb-2">YOUR RECORDS</h2>

  {loading && <p>Loading...</p>}

  <button
    onClick={() => navigate(-1)}
    className="fixed right-5 top-3 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:scale-105 transition-all border border-gray-200"
  >
    <FaArrowLeft className="text-xl text-blue-400" />
  </button>

  <div className="flex flex-col gap-4">
    {records.map((r) => (
      <div
        key={r._id}
        className="bg-white p-2 rounded-xl shadow flex items-start gap-4 hover:shadow-lg transition-all"
      >
        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={commonImage}
            alt="Problem"
            className="w-16 h-16 object-cover rounded-lg"
          />
        </div>

        <div className="flex-1 text-left">
          <h3 className="font-semibold text-gray-800">{r.problem?.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{r.problem?.description}</p>

          <div className="mt-2 text-sm flex flex-col gap-1">
            <span className="font-semibold text-blue-600/90">
              Quoted: ₹{r.priceQuoted} &nbsp; Visit: ₹{r.visitCharge}
            </span>
            <div className="text-xs text-gray-400">
              Selected on: {new Date(r.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="text-right flex flex-col justify-between">
          <div className="font-semibold text-gray-600">Total</div>
          <div className="text-lg font-bold text-green-600">
            ₹{r.totalPrice}
          </div>
          <div className="text-xs text-gray-400">{r.status}</div>
        </div>
      </div>
    ))}

    {records.length === 0 && !loading && (
      <p className="text-gray-500 text-center mt-4">No records yet.</p>
    )}
  </div>
</div>
  );
};

export default Total;