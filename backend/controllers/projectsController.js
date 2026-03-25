const Project = require("../models/Project");
const cloudinary = require("../config/cloudinary");

const BASE_FOLDER = process.env.CLOUDINARY_FOLDER || "portfolio";
const PROJECTS_FOLDER = process.env.CLOUDINARY_PROJECTS_FOLDER || `${BASE_FOLDER}/projects`;

const toArray = (value) => {
	if (Array.isArray(value)) return value;
	if (typeof value !== "string") return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch (_error) {
		return [];
	}
};

const uploadImage = (buffer, namePrefix) =>
	new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{
				folder: PROJECTS_FOLDER,
				resource_type: "image",
				public_id: `${namePrefix}-${Date.now()}`,
				use_filename: false,
				unique_filename: true,
				overwrite: true,
			},
			(error, result) => {
				if (error) return reject(error);
				return resolve(result);
			}
		);

		stream.end(buffer);
	});

const destroyIfExists = async (publicId) => {
	if (!publicId) return;
	try {
		await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
	} catch (_error) {
		// Ignore cleanup errors.
	}
};

const uploadGalleryImages = async (files) => {
	if (!files?.length) return [];
	return Promise.all(files.map((file, idx) => uploadImage(file.buffer, `project-gallery-${idx + 1}`)));
};

const destroyMany = async (publicIds) => {
	if (!Array.isArray(publicIds) || publicIds.length === 0) return;
	await Promise.all(publicIds.map((publicId) => destroyIfExists(publicId)));
};

const parsePayload = (req) => {
	const payload = req.body?.payload ? JSON.parse(req.body.payload) : req.body;
	return {
		...payload,
		technologies: toArray(payload.technologies),
		features: toArray(payload.features),
		tags: toArray(payload.tags),
	};
};

const getAll = async (_req, res) => {
	try {
		const rows = await Project.find().sort({ createdAt: -1 });
		return res.json(rows);
	} catch (error) {
		return res.status(500).json({ message: error.message || "Server error" });
	}
};

const getOne = async (req, res) => {
	try {
		const lookup = req.params.idOrSlug;
		const row = await Project.findOne({ $or: [{ _id: lookup }, { id: lookup }] });
		if (!row) return res.status(404).json({ message: "Not found" });
		return res.json(row);
	} catch (_error) {
		const row = await Project.findOne({ id: req.params.idOrSlug });
		if (!row) return res.status(404).json({ message: "Not found" });
		return res.json(row);
	}
};

const create = async (req, res) => {
	try {
		const payload = parsePayload(req);

		if (req.files?.image?.[0]?.buffer) {
			const image = await uploadImage(req.files.image[0].buffer, "project-cover");
			payload.image = image.secure_url;
			payload.imagePublicId = image.public_id;
		}

		if (req.files?.galleryImage?.[0]?.buffer) {
			const gallery = await uploadImage(req.files.galleryImage[0].buffer, "project-gallery");
			payload.galleryImage = gallery.secure_url;
			payload.galleryImagePublicId = gallery.public_id;
		}

		if (req.files?.galleryImages?.length) {
			const galleries = await uploadGalleryImages(req.files.galleryImages);
			payload.galleryImages = galleries.map((g) => g.secure_url);
			payload.galleryImagesPublicIds = galleries.map((g) => g.public_id);
			if (!payload.galleryImage && payload.galleryImages.length > 0) {
				payload.galleryImage = payload.galleryImages[0];
				payload.galleryImagePublicId = payload.galleryImagesPublicIds[0] || "";
			}
		}

		const row = await Project.create(payload);
		return res.status(201).json(row);
	} catch (error) {
		return res.status(500).json({ message: error.message || "Server error" });
	}
};

const update = async (req, res) => {
	try {
		const existing = await Project.findById(req.params.id);
		if (!existing) return res.status(404).json({ message: "Not found" });

		const payload = parsePayload(req);

		if (req.files?.image?.[0]?.buffer) {
			const image = await uploadImage(req.files.image[0].buffer, "project-cover");
			payload.image = image.secure_url;
			payload.imagePublicId = image.public_id;
			await destroyIfExists(existing.imagePublicId);
		}

		if (req.files?.galleryImage?.[0]?.buffer) {
			const gallery = await uploadImage(req.files.galleryImage[0].buffer, "project-gallery");
			payload.galleryImage = gallery.secure_url;
			payload.galleryImagePublicId = gallery.public_id;
			await destroyIfExists(existing.galleryImagePublicId);
		}

		if (req.files?.galleryImages?.length) {
			const galleries = await uploadGalleryImages(req.files.galleryImages);
			payload.galleryImages = galleries.map((g) => g.secure_url);
			payload.galleryImagesPublicIds = galleries.map((g) => g.public_id);
			if (payload.galleryImages.length > 0) {
				payload.galleryImage = payload.galleryImages[0];
				payload.galleryImagePublicId = payload.galleryImagesPublicIds[0] || "";
			}
			await destroyMany(existing.galleryImagesPublicIds);
			if (existing.galleryImagePublicId && !existing.galleryImagesPublicIds?.includes(existing.galleryImagePublicId)) {
				await destroyIfExists(existing.galleryImagePublicId);
			}
		}

		const row = await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
		return res.json(row);
	} catch (error) {
		return res.status(500).json({ message: error.message || "Server error" });
	}
};

const remove = async (req, res) => {
	try {
		const row = await Project.findByIdAndDelete(req.params.id);
		if (!row) return res.status(404).json({ message: "Not found" });

		await Promise.all([
			destroyIfExists(row.imagePublicId),
			destroyIfExists(row.galleryImagePublicId),
			destroyMany(row.galleryImagesPublicIds),
		]);

		return res.json({ message: "Deleted" });
	} catch (error) {
		return res.status(500).json({ message: error.message || "Server error" });
	}
};

module.exports = { getAll, getOne, create, update, remove };
