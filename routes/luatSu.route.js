const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/luatSu.controller");

Route.post("/getList", tryCatch(controller.getList));
Route.post("/getInfo", tryCatch(controller.getInfo));
Route.post("/getLinhVuc", tryCatch(controller.getLinhVuc));
Route.post("/getTrinhdo", tryCatch(controller.getTrinhdo));
Route.post("/getLuatsuTheoLinhvuc", tryCatch(controller.getLuatsuTheoLinhvuc));
Route.post("/postDanhgia", tryCatch(controller.postDanhgia));
Route.post("/updateInfo", tryCatch(controller.updateInfo));
Route.post("/create", tryCatch(controller.create));
Route.post("/remove", tryCatch(controller.remove));

module.exports = Route;
