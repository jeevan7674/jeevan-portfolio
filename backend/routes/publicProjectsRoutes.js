const express = require("express");
const { getAll, getOne } = require("../controllers/projectsController");

const router = express.Router();

router.get("/", getAll);
router.get("/:idOrSlug", getOne);

module.exports = router;
