const About = require("../models/About");

const getAbout = async (_req, res) => {
  try {
    const about = await About.findOne({ key: "main" });
    return res.json(about || { headline: "", bio: [], initials: "" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAbout = async (req, res) => {
  try {
    const about = await About.findOneAndUpdate({ key: "main" }, req.body, {
      upsert: true,
      new: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    });
    return res.json(about);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getAbout, updateAbout };
