const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/luatSu.controller");

Route.post("/getList", tryCatch(controller.getList));
Route.post("/getInfo", tryCatch(controller.getInfo));
Route.post("/getLinhVuc", tryCatch(controller.getLinhVuc));

module.exports = Route;
