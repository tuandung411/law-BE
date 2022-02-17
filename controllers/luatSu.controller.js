const luatSuService = require("../services/luatSu.service");

const getList = async (req, res) => {
    const data = await luatSuService.getList();
    res.send(data);
};
const getInfo = async (req, res) => {
    const { id } = req.body;
    const data = await luatSuService.getInfo(id);
    console.log(id, "check");
    res.send(data);
};
const getLinhVuc = async (req, res) => {
    const { id } = req.body;
    const data = await luatSuService.getLinhVuc(id);
    console.log(id);
    res.send(data);
};

module.exports = {
    getList,
    getInfo,
    getLinhVuc,
};
