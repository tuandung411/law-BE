const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const controller = require('../controllers/thoiGian.controller');

Route.get('/:id', tryCatch(controller.getByIdExam))
Route.post('/', tryCatch(controller.create));

module.exports = Route;