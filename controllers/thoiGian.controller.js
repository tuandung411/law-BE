const thoiGianService = require('../services/thoiGian.service');

const getByIdExam = async (req, res) => {
    const {id} = req.params;
    const data =  await thoiGianService.getByIdExam(id);
    res.send(data);
}

const create = async (req, res) => {
    const mess = await thoiGianService.create(req.body);
    res.send(mess);
}

module.exports = {
    getByIdExam,
    create
}