const codeService = require("../services/code.service");

const get = async (req, res) => {
    const { data, metadata } = await codeService.get(req.pagination);
    res.status(200).set("Content-Range", metadata.total).send(data);
};

const create = async (req, res) => {
    const mess = await codeService.create();
    res.send(mess);
};

const deleteMany = async (req, res) => {
    const mess = await codeService.deleteMany(req.body);
    res.send(mess);
};

module.exports = {
    get,
    create,
    deleteMany,
};
