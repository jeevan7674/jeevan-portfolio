const { createCrudRouter } = require("./crudRouteFactory");
const controller = require("../controllers/experienceController");

module.exports = createCrudRouter(controller);
