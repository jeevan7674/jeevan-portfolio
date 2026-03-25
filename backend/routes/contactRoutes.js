const express = require("express");
const { createMessage, getAllMessages, markRead, removeMessage } = require("../controllers/contactController");

const router = express.Router();

router.route("/").get(getAllMessages).post(createMessage);
router.patch("/:id/read", markRead);
router.delete("/:id", removeMessage);

module.exports = router;
