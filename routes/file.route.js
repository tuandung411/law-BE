const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");

const controller = require("../controllers/file.controller");

Route.get("/download", tryCatch(controller.download));

module.exports = Route;
