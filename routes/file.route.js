const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");

const controller = require("../controllers/file.controller");

Route.post("/download", tryCatch(controller.download));

module.exports = Route;
