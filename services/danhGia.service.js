const db = require("../utils/db");
// const codeService = require('./code.service');

const getList = async () => {
    const sql = `  SELECT  danhgia.ID,danhgia.noidung, luatsu.ten as tenLS,user.ten as tenKH,danhgia.ngaytao FROM ((danhgia inner join luatsu on danhgia.maLS = luatsu.ID) inner join user on danhgia.maKH = user.ID)`;
    const data = await db.query(sql);
    return data;
};
const getInfo = async (params) => {
    const { id } = params;
    const sql = `  SELECT  danhgia.ID,danhgia.noidung, luatsu.ten as tenLS,user.ten as tenKH,danhgia.ngaytao FROM ((danhgia inner join luatsu on danhgia.maLS = luatsu.ID) inner join user on danhgia.maKH = user.ID) where danhgia.ID=?`;
    const data = await db.query(sql, [id]);
    return data;
};

module.exports = {
    getList,
    getInfo,
};
