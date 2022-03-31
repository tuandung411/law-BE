const emailService = require("../services/email.service");

const dangKi = async (req, res) => {
    const { userID, law, email, content, price, file } = req.body;
    const data = await emailService.dangKi(req.body);
    res.send(data);
};
const getList = async (req, res) => {
    const data = await emailService.getList();
    res.send(data);
};
const getInfo = async (req, res) => {
    const data = await emailService.getInfo(req.body);
    res.send(data);
};
const update = async (req, res) => {
    const data = await emailService.update(req.body);
    res.send(data);
};

module.exports = {
    dangKi,
    getList,
    getInfo,
    update,
};
