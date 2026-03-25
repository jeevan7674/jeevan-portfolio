const mongoose = require("mongoose");

const ExperienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, default: "" },
    location: { type: String, default: "" },
    period: { type: String, default: "" },
    type: { type: String, default: "Internship" },
    description: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", ExperienceSchema);
