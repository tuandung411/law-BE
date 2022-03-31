const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");

const controller = require("../controllers/danhGia.controller");

Route.post("/getList", tryCatch(controller.getList));
Route.post("/getInfo", tryCatch(controller.getInfo));

module.exports = Route;
