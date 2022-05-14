const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/email.controller");
const multer = require("multer");
const { uploads, checkFile } = require("../midlewares/file");

Route.post("/dangKi", uploads, checkFile, tryCatch(controller.dangKi));
Route.post("/dangKi2", tryCatch(controller.dangKi2));
Route.post("/getList", tryCatch(controller.getList));
Route.post("/getInfo", tryCatch(controller.getInfo));
Route.post("/update", tryCatch(controller.update));
Route.post("/remove", tryCatch(controller.remove));

module.exports = Route;
