const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const controller = require("../controllers/user.controller");
const { requireLogin } = require("../midlewares/auth");

Route.get("/getInfo", requireLogin, tryCatch(controller.getInfo));
Route.post("/register", tryCatch(controller.register));
Route.put("/", requireLogin, tryCatch(controller.update));
Route.put("/changPassword", requireLogin, tryCatch(controller.changePassword));

module.exports = Route;
