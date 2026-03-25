const mongoose = require("mongoose");

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: { type: String, default: "hsl(265, 85%, 60%)" },
    group: { type: String, default: "Frontend" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Skill", SkillSchema);
