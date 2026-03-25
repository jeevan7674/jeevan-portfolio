const express = require("express");
const multer = require("multer");
const controller = require("../controllers/projectsController");

const router = express.Router();
const upload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 10 * 1024 * 1024 },
});

router
	.route("/")
	.get(controller.getAll)
	.post(
		upload.fields([
			{ name: "image", maxCount: 1 },
			{ name: "galleryImage", maxCount: 1 },
			{ name: "galleryImages", maxCount: 12 },
		]),
		controller.create
	);

router
	.route("/:id")
	.put(
		upload.fields([
			{ name: "image", maxCount: 1 },
			{ name: "galleryImage", maxCount: 1 },
			{ name: "galleryImages", maxCount: 12 },
		]),
		controller.update
	)
	.delete(controller.remove);

module.exports = router;
