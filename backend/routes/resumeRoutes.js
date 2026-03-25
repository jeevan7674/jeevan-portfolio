const express = require("express");
const multer = require("multer");
const { getResume, uploadResume, downloadResume } = require("../controllers/resumeController");

const router = express.Router();
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 },
});

router.route("/").get(getResume).put(upload.single("file"), uploadResume);
router.get("/download", downloadResume);

module.exports = router;
