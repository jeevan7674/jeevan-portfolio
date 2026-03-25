const mongoose = require("mongoose");

const ContactInfoSchema = new mongoose.Schema(
  {
    key: { type: String, default: "main", unique: true },
    name: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    location: { type: String, default: "" },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    website: { type: String, default: "" },
    availability: { type: String, default: "Open to opportunities" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactInfo", ContactInfoSchema);
