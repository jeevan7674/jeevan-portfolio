const express = require("express");
const { trackVisit, getStats } = require("../controllers/analyticsController");

const router = express.Router();

router.get("/stats", getStats);
router.post("/track", trackVisit);

module.exports = router;
