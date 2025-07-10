const Report = require("../models/reportModel");

exports.createReport = async (req, res) => {
  try {
      
    const { utilitytype, description, latitude,longitude,address } = req.body;
    const imageUrl = req.file ? req.file.filename : null;

    const newReport = new Report({
      utilitytype,
      description,
      latitude,
      longitude,
      address,
      imageUrl,
      createdBy: req.user.uid, // 👈 from JWT
    });

    await newReport.save();
    res.status(200).json({ message: "Report submitted", report: newReport });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// ✅ Get user's own reports
exports.getMyReports = async (req, res) => {
  try {
      const userId = req.user.uid;
    const reports = await Report.find({ createdBy: req.user.uid }).sort({ createdAt: -1 });
    res.status(200).json({ reports });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Get all reports (admin only)
exports.getAllReports = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Access denied" });

  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json({ reports });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update report status (admin only)
exports.updateReport = async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ error: "Access denied" });

  const { id } = req.params;
  const { status } = req.body;

  if (!["pending", "Accepted", "Rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  try {
    const report = await Report.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!report) return res.status(404).json({ error: "Report not found" });

    res.status(200).json({ message: "Status updated", report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
