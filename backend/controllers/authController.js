const Admin = require("../models/Admin");
const { generateToken } = require("../middleware/authMiddleware");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin || !admin.active) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken(admin._id);
    return res.json({
      token,
      admin: admin.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Admin already exists with this email" });
    }

    const admin = await Admin.create({
      email,
      password,
      name: name || email.split("@")[0],
      role: "admin",
      active: true,
    });

    const token = generateToken(admin._id);
    return res.status(201).json({
      token,
      admin: admin.toJSON(),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCurrentAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.adminId);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    return res.json(admin.toJSON());
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { login, register, getCurrentAdmin };
