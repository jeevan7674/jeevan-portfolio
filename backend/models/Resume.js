const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },
    url: { type: String, default: "" },
    publicId: { type: String, default: "" },
    originalName: { type: String, default: "" },
    resourceType: { type: String, default: "raw" },
    uploadedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resume", ResumeSchema);
