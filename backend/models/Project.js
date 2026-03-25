const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    id: { type: String, default: "" },
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: String, default: "" },
    technologies: { type: [String], default: [] },
    features: { type: [String], default: [] },
    goal: { type: String, default: "" },
    github: { type: String, default: "" },
    demo: { type: String, default: "" },
    image: { type: String, default: "" },
    imagePublicId: { type: String, default: "" },
    galleryImage: { type: String, default: "" },
    galleryImagePublicId: { type: String, default: "" },
    galleryImages: { type: [String], default: [] },
    galleryImagesPublicIds: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    category: { type: String, default: "Web" },
    status: {
      type: String,
      enum: ["Completed", "In Progress"],
      default: "In Progress",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project", ProjectSchema);
