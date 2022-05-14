const dienThoaiService = require("../services/dienThoai.service");

const dangKi = async (req, res) => {
    const { userID, maDV, date } = req.body;

    const data = await dienThoaiService.dangKi({ userID, maDV, date });
    res.send(data);
};
const getList = async (req, res) => {
    const data = await dienThoaiService.getList();
    res.send(data);
};
const getInfo = async (req, res) => {
    const data = await dienThoaiService.getInfo(req.body);
    res.send(data);
};
const update = async (req, res) => {
    const data = await dienThoaiService.update(req.body);
    res.send(data);
};
const remove = async (req, res) => {
    const data = await dienThoaiService.remove(req.body);
    res.send(data);
};
module.exports = {
    dangKi,
    getList,
    getInfo,
    update,
    remove,
};
