const mongoose = require("mongoose");

const AboutSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },
    headline: { type: String, default: "" },
    bio: { type: [String], default: [] },
    initials: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
