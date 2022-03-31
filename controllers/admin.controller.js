const adminService = require("../services/admin.service");
//
const login = async (req, res) => {
    const response = await adminService.login(req.body);
    res.status(response.status).send(response.data);
    // res.send(response.data); Auto send status 200
};
const register = async (req, res) => {
    const response = await adminService.register(req.body);
    res.status(response.status).send(response.data);
};

module.exports = {
    login,
    register,
};
