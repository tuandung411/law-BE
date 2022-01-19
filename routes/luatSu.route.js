const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/luatSu.controller");

Route.post("/getList", tryCatch(controller.getList));

module.exports = Route;
