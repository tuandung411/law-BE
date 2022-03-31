const dienThoaiService = require("../services/dienThoai.service");

const dangKi = async (req, res) => {
    const { userID, maDV } = req.body;

    const data = await dienThoaiService.dangKi({ userID, maDV });
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
module.exports = {
    dangKi,
    getList,
    getInfo,
    update,
};
