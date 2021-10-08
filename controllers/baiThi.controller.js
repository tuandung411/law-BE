const baiThiService = require("../services/baiThi.service");

const getListExam = async (req, res) => {
    const data = await baiThiService.getListExam(req.user);
    res.send(data);
};

const historyExam = async (req, res) => {
    console.log(req.user);
};

const createEmptyExam = async (req, res) => {
    const idBaiThi = await baiThiService.createEmptyExam(req.body, req.user);
    res.json(idBaiThi);
};

module.exports = {
    getListExam,
    historyExam,
    createEmptyExam,
};
