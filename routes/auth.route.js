const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/auth.controller");

Route.post("/", requireLogin, tryCatch(controller.auth));
Route.post("/getList", tryCatch(controller.getList));
Route.post("/getUser", tryCatch(controller.getUser));
Route.post("/remove", tryCatch(controller.remove));
Route.post("/update", tryCatch(controller.update));
Route.post("/login", tryCatch(controller.login));
Route.post("/register2", tryCatch(controller.register2));
Route.post("/register", tryCatch(controller.register));

module.exports = Route;
