const express = require("express");

const createCrudRouter = (controller) => {
  const router = express.Router();

  router.route("/").get(controller.getAll).post(controller.create);
  router.route("/:id").put(controller.update).delete(controller.remove);

  return router;
};

module.exports = { createCrudRouter };
