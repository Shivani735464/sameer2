// import express from "express";
// import fetch from "node-fetch";

// const router = express.Router();

// // GET /api/location/reverse?lat=xx&lon=yy

// router.get("/reverse", async (req, res) => {
//   try {
//     const { lat, lon } = req.query;

//     if (!lat || !lon) {
//       return res.status(400).json({ error: "Latitude and Longitude required" });
//     }

//     const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`;

//     const response = await fetch(url, {
//       headers: {
//         "User-Agent": "YourAppName/1.0 (your-email@example.com)",
//       },
//     });

//     if (!response.ok) {
//       return res.status(response.status).json({ error: "Nominatim request failed" });
//     }

//     const data = await response.json();
//     res.json(data);
//   } catch (error) {
//     console.error("Reverse geocode failed:", error);
//     res.status(500).json({ error: "Failed to fetch location" });
//   }
// });

// export default router;




import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.get("/reverse", async (req, res) => {
  const { lat, lon } = req.query;

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`,
      {
        headers: {
          "User-Agent": "LabourApp/1.0 (sameer@example.com)", // required by Nominatim
          "Accept-Language": "en",
        },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ message: "Reverse geocode failed" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: "Reverse geocode failed", error: err.message });
  }
});

export default router;