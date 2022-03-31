const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/dienThoai.controller");

Route.post("/dangKi", tryCatch(controller.dangKi));
Route.post("/getList", tryCatch(controller.getList));
Route.post("/getInfo", tryCatch(controller.getInfo));
Route.post("/update", tryCatch(controller.update));

module.exports = Route;
