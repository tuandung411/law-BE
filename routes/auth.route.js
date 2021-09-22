const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const {requireLogin} = require('../midlewares/auth');
const controller = require('../controllers/auth.controller');

Route.post('/', requireLogin, tryCatch(controller.auth))
Route.post('/login', tryCatch(controller.login));

module.exports = Route;