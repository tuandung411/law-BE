const fileNgheService = require('../services/fileNghe.service');

const getById = async (req, res) => {
    const {id} = req.params;
    const data = await fileNgheService.getById(id)
    res.send(data);
}

const getByExam = async (req, res) => {
    const {idExam} = req.params;
    const data = await fileNgheService.getByExam(idExam);
    res.send(data);
}

const create = async (req, res) => {
    const {idExam} = req.params;
    const mess = await fileNgheService.create(req.body, idExam);
    res.send(mess);
}

module.exports = {
    getById,
    getByExam,
    create
}