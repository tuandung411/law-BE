const DBaiThiService = require("../services/D_BaiThi.service");

const getResults = async (req, res) => {
    const data = await DBaiThiService.getResults(req.query);
    res.send(data);
};
const getAnsweredById = async (req, res) => {
    const { idCauHoi, idBaiThi } = req.params;
    const data = await DBaiThiService.getAnsweredById(idCauHoi, idBaiThi);
    res.send(data);
};
const update = async (req, res) => {
    const mess = await DBaiThiService.update(req.body);

    res.send(mess);
};

const recordAudio = async (req, res) => {
    // const { file, idBaiThi, idQuestion, idPart } = req.body;
    // const NoiDung = file;
    // const mess = await DBaiThiService.update({
    //     idQuestion,
    //     idBaiThi,
    //     NoiDung,
    //     idPart,
    // });
    const mess = await DBaiThiService.update({
        ...req.body,
        NoiDung: req.body.file,
    });
    res.send(mess);
};

module.exports = {
    getResults,
    getAnsweredById,
    update,
    recordAudio,
    getAnsweredById,
};
