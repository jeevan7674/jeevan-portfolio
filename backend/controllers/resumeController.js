const Resume = require("../models/Resume");
const cloudinary = require("../config/cloudinary");

const BASE_FOLDER = process.env.CLOUDINARY_FOLDER || "portfolio";
const RESUME_FOLDER = process.env.CLOUDINARY_RESUME_FOLDER || `${BASE_FOLDER}/resume`;

const cloudinaryUpload = (buffer, originalName) =>
  new Promise((resolve, reject) => {
    const upload = cloudinary.uploader.upload_stream(
      {
        folder: RESUME_FOLDER,
        resource_type: "raw",
        public_id: `resume-${Date.now()}`,
        use_filename: false,
        unique_filename: true,
        overwrite: true,
        filename_override: originalName || `resume-${Date.now()}.pdf`,
      },
      (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      }
    );

    upload.end(buffer);
  });

const getResume = async (_req, res) => {
  try {
    const resume = await Resume.findOne({ key: "main" });
    return res.json(resume || { url: "", downloadUrl: "", uploadedAt: null });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const uploadResume = async (req, res) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ message: "Resume file is required" });
    }

    const existingResume = await Resume.findOne({ key: "main" });

    const uploadResult = await cloudinaryUpload(req.file.buffer, req.file.originalname);

    if (existingResume?.publicId) {
      try {
        await cloudinary.uploader.destroy(existingResume.publicId, { resource_type: "raw" });
      } catch (_cleanupError) {
        // Cleanup failure should not block a successful upload replacement.
      }
    }

    const resume = await Resume.findOneAndUpdate(
      { key: "main" },
      {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
        originalName: req.file.originalname,
        resourceType: uploadResult.resource_type || "raw",
        uploadedAt: new Date(),
      },
      { upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true }
    );

    return res.json(resume);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const downloadResume = async (_req, res) => {
  try {
    const resume = await Resume.findOne({ key: "main" });
    if (!resume?.publicId) {
      return res.status(404).json({ message: "Resume not found" });
    }

    const signedUrl = cloudinary.utils.private_download_url(
      resume.publicId,
      "pdf",
      {
        resource_type: resume.resourceType || "raw",
        expires_at: Math.floor(Date.now() / 1000) + 60 * 10,
        attachment: resume.originalName || "resume.pdf",
      }
    );

    return res.json({ downloadUrl: signedUrl });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getResume, uploadResume, downloadResume };
