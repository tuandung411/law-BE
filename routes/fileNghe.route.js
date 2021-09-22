const Route = require('express').Router();
const {tryCatch} = require('../midlewares/errorHandle');
const {uploads, checkFile} = require('../midlewares/file');
const controller = require('../controllers/fileNghe.controller');

Route.get('/:idExam', tryCatch(controller.getByExam));
Route.post('/:idExam', uploads, checkFile, tryCatch(controller.create))

// Route.post('/part', tryCatch(controller.createPart));

module.exports = Route;