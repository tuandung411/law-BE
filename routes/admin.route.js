const Route = require("express").Router();
const { tryCatch } = require("../midlewares/errorHandle");
const { requireLogin } = require("../midlewares/auth");
const controller = require("../controllers/admin.controller");

Route.post("/login", tryCatch(controller.login));
Route.post("/register", tryCatch(controller.register));

module.exports = Route;
