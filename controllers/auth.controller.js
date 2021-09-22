const authService = require("../services/auth.service");
//
const login = async (req, res) => {
    const response = await authService.login(req.body);
    res.status(response.status).send(response.data);
};

const auth = async (req, res) => {
    const response = await authService.auth(req.user, req.body);
    res.status(response.status).send(response.mess);
};

module.exports = {
    login,
    auth,
};
