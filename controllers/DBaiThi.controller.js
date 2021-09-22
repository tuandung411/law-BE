const DBaiThiService = require('../services/D_BaiThi.service');

const getResults = async (req, res) => {
    const data = await DBaiThiService.getResults(req.query);
    res.send(data);
}

const update = async (req, res) => {
    const mess = await DBaiThiService.update(req.body);
    res.send(mess);
}

const recordAudio = async (req, res) => {
    const mess = await DBaiThiService.update({...req.body, NoiDung: req.body.file})
    res.send(mess);
}

module.exports = {
    getResults,
    update,
    recordAudio
}