const { createCrudRouter } = require("./crudRouteFactory");
const controller = require("../controllers/achievementsController");

module.exports = createCrudRouter(controller);
