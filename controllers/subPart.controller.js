const subPartService = require('../services/subPart.service');


const update = async (req, res) => {
    const {id} = req.params;
    const mess = await subPartService.update(req.body, id);
    res.send(mess);
}

module.exports = {
    update
}
