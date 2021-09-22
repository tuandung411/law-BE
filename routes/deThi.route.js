const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const controller = require('../controllers/deThi.controller');

Route.get('/', tryCatch(controller.get));
Route.get('/:id', tryCatch(controller.getById));
Route.get('/:idExam/:id_Part', tryCatch(controller.getPart));
Route.post('/', tryCatch(controller.create))
Route.post('/createEmptyExam', tryCatch(controller.createEmptyExam))
Route.delete('/', tryCatch(controller.deleteMany));
Route.put('/changeStatus', tryCatch(controller.changeStatus))
// Route.post('/part', tryCatch(controller.createPart));

module.exports = Route;