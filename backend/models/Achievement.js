const mongoose = require("mongoose");

const AchievementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    icon: { type: String, default: "trophy" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Achievement", AchievementSchema);
