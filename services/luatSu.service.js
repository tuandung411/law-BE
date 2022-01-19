const db = require("../utils/db");
// const codeService = require('./code.service');

const getList = async () => {
    const sql = `select * from luatsu `;
    const data = await db.query(sql);
    console.log(data);
    return data;
};

module.exports = {
    getList,
};
