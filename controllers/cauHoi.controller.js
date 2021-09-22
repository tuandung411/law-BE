const cauHoiService = require('../services/cauHoi.service');

const update = async (req, res) => {
    const {id} = req.params;
    const mess = await cauHoiService.update(req.body, id);
    res.send(mess);
}

module.exports ={
    update
}