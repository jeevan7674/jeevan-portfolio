const express = require("express");
const { getAbout, updateAbout } = require("../controllers/aboutController");

const router = express.Router();

router.route("/").get(getAbout).put(updateAbout);

module.exports = router;
