const res = require("express/lib/response");
const authService = require("../services/auth.service");
//
const getList = async (req, res) => {
    const data = await authService.getList();
    res.send(data);
};
const getUser = async (req, res) => {
    const data = await authService.getUser(req.body);
    res.send(data);
};
const update = async (req, res) => {
    const data = await authService.update(req.body);
    res.send(data);
};
const remove = async (req, res) => {
    const data = await authService.remove(req.body);
    res.send(data);
};
const login = async (req, res) => {
    const response = await authService.login(req.body);
    res.status(response.status).send(response.data);
};
const register = async (req, res) => {
    const response = await authService.register(req.body);
    res.status(response.status).send(response.data);
};
const register2 = async (req, res) => {
    const response = await authService.register2(req.body);
    res.status(response.status).send(response.data);
};

const auth = async (req, res) => {
    const response = await authService.auth(req.user, req.body);
    res.status(response.status).send(response.mess);
};

module.exports = {
    getList,
    getUser,
    remove,
    login,
    register,
    register2,
    auth,
    update,
};
