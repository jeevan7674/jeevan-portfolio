const ContactMessage = require("../models/ContactMessage");

const createMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: "name, email and message are required" });
    }

    const row = await ContactMessage.create({ name, email, message, status: "unread", date: new Date() });
    return res.status(201).json(row);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllMessages = async (_req, res) => {
  try {
    const rows = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const markRead = async (req, res) => {
  try {
    const row = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true, runValidators: true }
    );
    if (!row) return res.status(404).json({ message: "Not found" });
    return res.json(row);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeMessage = async (req, res) => {
  try {
    const row = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!row) return res.status(404).json({ message: "Not found" });
    return res.json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { createMessage, getAllMessages, markRead, removeMessage };
