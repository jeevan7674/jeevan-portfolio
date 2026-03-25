const ContactInfo = require("../models/ContactInfo");

const getContactInfo = async (_req, res) => {
  try {
    const info = await ContactInfo.findOne({ key: "main" });
    return res.json(
      info || {
        name: "",
        email: "",
        phone: "",
        location: "",
        github: "",
        linkedin: "",
        website: "",
        availability: "Open to opportunities",
      }
    );
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateContactInfo = async (req, res) => {
  try {
    const info = await ContactInfo.findOneAndUpdate({ key: "main" }, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    return res.json(info);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getContactInfo, updateContactInfo };
