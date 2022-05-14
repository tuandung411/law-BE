const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/luatSu.controller");

Route.post("/getList", tryCatch(controller.getList));
Route.post("/getList2", tryCatch(controller.getList2));
Route.post("/getInfo", tryCatch(controller.getInfo));
Route.post("/getLinhVuc", tryCatch(controller.getLinhVuc));
Route.post("/getTrinhdo", tryCatch(controller.getTrinhdo));
Route.post("/getLuatsuTheoLinhvuc", tryCatch(controller.getLuatsuTheoLinhvuc));
Route.post(
    "/getLuatsuTheoIdLinhvuc",
    tryCatch(controller.getLuatsuTheoIdLinhvuc)
);
Route.post("/postDanhgia", tryCatch(controller.postDanhgia));
Route.post("/updateInfo", tryCatch(controller.updateInfo));
Route.post("/create", tryCatch(controller.create));
Route.post("/remove", tryCatch(controller.remove));

module.exports = Route;
