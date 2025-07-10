const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    utilitytype: String,
    description: String,
   // optional display name (like street or area)
    latitude: String,   // ✅ added
    longitude: String,  // ✅ added
    imageUrl: String,
    address: String,
    status: {
      type: String,
      enum: ["pending", "Accepted", "Rejected"],
      default: "pending",
    },
    createdBy: String, // user UID (from JWT)
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema, "Reportsinfo");
