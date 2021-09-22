const DCauHoiService = require('../services/DCauHoi.service');


const getByQuestion = async (req, res) => {
    const {idQuestion} = req.params;
    const data = await DCauHoiService.getByQuestion(idQuestion);
    res.send(data);
}   

const update = async (req, res) => {
    const {id} = req.params;
    const mess = await DCauHoiService.update(req.body, id);
    res.send(mess);
}

module.exports = {
    getByQuestion,
    update
} 

