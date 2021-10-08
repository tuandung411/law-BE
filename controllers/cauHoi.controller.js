const cauHoiService = require("../services/cauHoi.service");

const update = async (req, res) => {
    const { id } = req.params;
    const mess = await cauHoiService.update(req.body, id);
    res.send(mess);
};
const getResultById = async (req, res) => {
    const { idCauHoi } = req.params;
    const data = await cauHoiService.getResultById(idCauHoi);
    res.send(data);
};
module.exports = {
    update,
    getResultById,
};
