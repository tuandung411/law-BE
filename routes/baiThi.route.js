const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const {requireLogin} = require('../midlewares/auth');
const controller = require('../controllers/baiThi.controller');

Route.get('/listExam', requireLogin, tryCatch(controller.getListExam))
Route.get('/historyExam', requireLogin, tryCatch(controller.historyExam))
Route.post('/createEmptyExam', requireLogin, tryCatch(controller.createEmptyExam))

module.exports = Route;