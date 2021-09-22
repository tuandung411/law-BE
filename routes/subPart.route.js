const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const controller = require('../controllers/subPart.controller');

Route.put('/:id', tryCatch(controller.update));

module.exports = Route;