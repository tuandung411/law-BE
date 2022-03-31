const danhGiaService = require("../services/danhGia.service");

const getList = async (req, res) => {
    const data = await danhGiaService.getList();
    res.send(data);
};
const getInfo = async (req, res) => {
    const data = await danhGiaService.getInfo(req.body);
    console.log(req.body);
    res.send(data);
};

module.exports = {
    getList,
    getInfo,
};
