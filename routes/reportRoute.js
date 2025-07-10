const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../Midlewares/verifyToken");

const {
  createReport,
  getMyReports,
  getAllReports,
  updateReport,
} = require("../controllers/reportController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`),
});

const upload = multer({ storage });

// 🆕 Routes
// router.post("/create", verifyToken, upload.single("image"), createReport);
router.post("/create", (req, res, next) => {
  verifyToken(req, res, (err) => {
    if (err) return; // optional error handling
    upload.single("image")(req, res, next);
  });
}, createReport);

router.get('/test', verifyToken,(req, res) => {
  res.send("User API is alive ✅");
});
router.get("/my-reports", verifyToken, getMyReports);
router.get("/all", verifyToken, getAllReports); // 🔐 Admin only
router.put("/update/:id", verifyToken, updateReport); // 🔐 Admin only

module.exports = router;
