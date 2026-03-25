const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const aboutRoutes = require("./routes/aboutRoutes");
const projectsRoutes = require("./routes/projectsRoutes");
const skillsRoutes = require("./routes/skillsRoutes");
const experienceRoutes = require("./routes/experienceRoutes");
const achievementsRoutes = require("./routes/achievementsRoutes");
const certificationsRoutes = require("./routes/certificationsRoutes");
const contactInfoRoutes = require("./routes/contactInfoRoutes");
const contactRoutes = require("./routes/contactRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const adminsRoutes = require("./routes/adminsRoutes");
const publicProjectsRoutes = require("./routes/publicProjectsRoutes");
const { protect } = require("./middleware/authMiddleware");

const app = express();

// DB Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Portfolio backend is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/admins", adminsRoutes);
app.use("/api/public/projects", publicProjectsRoutes);

app.use(protect);

app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectsRoutes);
app.use("/api/skills", skillsRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/achievements", achievementsRoutes);
app.use("/api/certifications", certificationsRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/analytics", analyticsRoutes);


// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});