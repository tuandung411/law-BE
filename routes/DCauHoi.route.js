const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const controller = require('../controllers/DCauHoi.controller');

Route.get('/getByQuestion/:idQuestion', tryCatch(controller.getByQuestion));
Route.put('/:id', tryCatch(controller.update))

module.exports = Route;