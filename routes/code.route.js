const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const controller = require('../controllers/code.controller');

Route.get('/', tryCatch(controller.get));
Route.post('/', tryCatch(controller.create));
Route.delete('/', tryCatch(controller.deleteMany))
// Route.put('/:id', tryCatch(controller.update));

module.exports = Route;