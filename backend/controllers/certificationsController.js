const Certification = require("../models/Certification");
const { createCrudController } = require("./crudFactory");

module.exports = createCrudController(Certification);
