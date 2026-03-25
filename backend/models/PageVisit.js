const mongoose = require("mongoose");

const PageVisitSchema = new mongoose.Schema(
  {
    page: { type: String, required: true },
    deviceType: { type: String, enum: ["desktop", "mobile", "tablet"], default: "desktop" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PageVisit", PageVisitSchema);
