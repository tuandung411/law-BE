const userService = require('../services/user.service');

const getInfo = async (req, res) => {
    const data = await userService.getInfo(req.user);
    res.send(data);
}

const create = async (req, res) => {
    const response = await userService.create(req.body);
    res.status(response.status).send(response.mess);
}

const update = async (req, res) => {
    const mess = await userService.update(req.body, req.user.username);
    res.send(mess)
}   

const changePassword = async (req, res) => {
    const response = await userService.changPassword(req.body, req.user);
    res.status(response.status).send(response.mess);
}

module.exports = {    
    getInfo,
    create,
    update,
    changePassword
}