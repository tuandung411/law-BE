const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const controller = require('../controllers/DBaiThi.controller');
const {uploads, checkFile} = require('../midlewares/file');

Route.get('/results', tryCatch(controller.getResults));
Route.put('/', tryCatch(controller.update))
Route.post('/recordAudio', uploads, checkFile, tryCatch(controller.recordAudio))
module.exports = Route;