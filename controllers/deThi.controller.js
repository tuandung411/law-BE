const deThiService = require('../services/deThi.service')



const get = async (req, res) => {
    const {data, metadata} = await deThiService.get(req.pagination, req.query);
    res.status(200).set('Content-Range', metadata.total).send(data);
}

const getById = async (req, res) => {
    const {id} = req.params;
    const data = await deThiService.getById(id);
    res.send(data);
}

const getPart = async (req, res) => {
    const {idExam, id_Part} = req.params;
    const data = await deThiService.getPart({idExam: idExam, idPart:id_Part});
    res.send(data);
}

const create = async (req, res) => {
    const idDeThi = await deThiService.create(req.body);
    res.json(idDeThi);
}

const createEmptyExam = async (req, res) => {
    const {id} = req.body;
    const mess = await deThiService.createEmptyExam(id);
    res.json(id);
} 
const deleteMany = async (req, res) => {
    const mess = await deThiService.deleteMany(req.body);
    res.send(mess);
}
// const createPart = async (req, res) => {
//     const mess = await deThiService.createPart(req.body)
//     res.send(mess);
// }

const changeStatus = async (req, res) => {
    const data = await deThiService.changeStatus(req.body);
    res.send(data);
}

module.exports = {
    get,
    getById,
    getPart,
    create,
    createEmptyExam,
    deleteMany,
    changeStatus
}