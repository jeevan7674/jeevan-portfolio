const { createCrudRouter } = require("./crudRouteFactory");
const controller = require("../controllers/certificationsController");

module.exports = createCrudRouter(controller);
