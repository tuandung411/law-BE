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
const getLuatsuTheoLinhvuc = async (req, res) => {
    const { id } = req.body;
    const data = await luatSuService.getLuatsuTheoLinhvuc(id);
    res.send(data);
};
const getTrinhdo = async (req, res) => {
    const { id } = req.body;
    const data = await luatSuService.getTrinhdo(id);
    res.send(data);
};
const postDanhgia = async (req, res) => {
    const { idUser, idLuatsu, content } = req.body;
    const data = await luatSuService.postDanhgia(idUser, idLuatsu, content);
    res.send(data);
};
const updateInfo = async (req, res) => {
    const data = await luatSuService.updateInfo(req.body);
    res.send(data);
};
const create = async (req, res) => {
    const data = await luatSuService.create(req.body);
    res.send(data);
};
const remove = async (req, res) => {
    const data = await luatSuService.remove(req.body);
    res.send(data);
};
module.exports = {
    getList,
    getInfo,
    getLinhVuc,
    getLuatsuTheoLinhvuc,
    getTrinhdo,
    postDanhgia,
    updateInfo,
    create,
};
