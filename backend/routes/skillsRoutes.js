const { createCrudRouter } = require("./crudRouteFactory");
const controller = require("../controllers/skillsController");

module.exports = createCrudRouter(controller);
