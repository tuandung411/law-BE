const luatSuService = require("../services/luatSu.service");

const getList = async (req, res) => {
    const data = await luatSuService.getList();
    res.send(data);
};

module.exports = {
    getList,
};
