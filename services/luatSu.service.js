const db = require("../utils/db");
// const codeService = require('./code.service');

const getList = async () => {
    const sql = `select * from luatsu `;
    const data = await db.query(sql);
    // console.log(data);
    return data;
};
const getInfo = async (id) => {
    const sql = `select * from luatsu where ID = ? `;
    const data = await db.queryOne(sql, [id]);
    // console.log(data);
    return data;
};
const getLinhVuc = async (id) => {
    const sql = `select linhvuc.tenLV from ((luatsu_linhvuc  inner join linhvuc on luatsu_linhvuc.ID_linhVuc = linhvuc.ID) inner join luatsu on luatsu.ID=luatsu_linhvuc.ID_luatSu) where luatsu.ID=?`;
    const listLinhVuc = await db.query(sql, [id]);
    // const listLinhVuc_LuatSu = await db.query(sql, [id]);
    // const listIDLinhVuc = listLinhVuc_LuatSu.map((x) => x.ID_linhVuc);

    // const listTenLV = listIDLinhVuc.map(async (x) => {
    //     let tenLV;
    //     return (tenLV = await db.query(sql2, [x]));
    //     console.log(tenLV);
    // });
    const data = listLinhVuc.map((x) => x.tenLV);
    console.log(data);
    return data;
};
module.exports = {
    getList,
    getInfo,
    getLinhVuc,
};
