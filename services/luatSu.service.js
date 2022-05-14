const db = require("../utils/db");
// const codeService = require('./code.service');

const getList = async () => {
    const sql = `select * from luatsu`;
    const data = await db.query(sql);

    return data;
};
const getList2 = async (params) => {
    const { listID } = params;
    var data = [];
    const sql = `select * from luatsu where ID=?`;

    for (var ID of listID) {
        var result = await db.queryOne(sql, [ID]);
        data = [...data, result];
    }

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
    // console.log(data);
    return data;
};
const getLuatsuTheoLinhvuc = async (id) => {
    console.log("id", id);
    const sql = `SELECT * FROM ((luatsu inner join luatsu_linhvuc on luatsu.ID=luatsu_linhvuc.ID_luatSu) inner join linhvuc on linhvuc.ID= luatsu_linhvuc.ID_linhvuc) where linhvuc.tenLV=?;`;
    const data = await db.query(sql, [id]);
    // console.log("list ne", data);
    return data;
};
const getLuatsuTheoIdLinhvuc = async (id) => {
    console.log("id", id);
    const sql = `SELECT * FROM ((luatsu inner join luatsu_linhvuc on luatsu.ID=luatsu_linhvuc.ID_luatSu) inner join linhvuc on linhvuc.ID= luatsu_linhvuc.ID_linhvuc) where linhvuc.ID=?;`;
    const data = await db.query(sql, [id]);
    // console.log("list ne", data);
    return data;
};
const getTrinhdo = async (id) => {
    const sql = `SELECT * FROM (luatsu_trinhdo inner join luatsu on luatsu_trinhdo.ID_luatsu=luatsu.ID) where luatsu.ID=?`;
    const listTrinhdo = await db.query(sql, [id]);

    const data = listTrinhdo.map((x) => x.trinhdo);
    console.log(data);
    return data;
};
const postDanhgia = async (idUser, idLuatsu, content) => {
    var date = "06/04/2022";
    const sql = `INSERT into danhgia(maKH,maLS,noidung,ngaytao) values(?,?,?,?)`;

    const data = await db.query(sql, [idUser, idLuatsu, content, date]);

    return data;
};
const create = async (params) => {
    const { name, address, phone, content, email, law, id, year, avt } = params;
    const sql1 = `insert into luatsu(ten,namSinh,sdt,diaChi,email,gioiThieu) values(?,?,?,?,?,?)`;
    const sql2 = `SELECT * FROM luatsu ORDER BY ID DESC LIMIT 1`;
    const sql3 = `INSERT into luatsu_linhvuc(ID_luatsu,ID_linhvuc) values(?,?)`;
    const exe1 = await db.query(sql1, [
        name,
        year,
        phone,
        address,
        email,
        content,
    ]);
    const ID = await db.query(sql2);
    const exe3 = law.forEach(async (item, index) => {
        const execute = await db.query(sql3, [ID, item]);
    });
    const data = { exe1, exe3 };
    return data;
};
const updateInfo = async (params) => {
    const { name, address, phone, content, mail, law, id } = params;
    const sql1 = `UPDATE luatsu set ten= ?,diaChi= ?,sdt=?,email=?,gioiThieu=? where ID = ?  `;
    const sql2 = `DELETE from luatsu_linhvuc where ID_luatsu = ?`;
    const sql3 = `INSERT into luatsu_linhvuc(ID_luatsu,ID_linhvuc) values(?,?)`;
    const exe1 = await db.query(sql1, [
        name,
        address,
        phone,
        mail,
        content,
        id,
    ]);
    const exe2 = await db.query(sql2, [id]);
    const length = law.length;
    const exe3 = law.forEach(async (item, index) => {
        const execute = await db.query(sql3, [id, item]);
    });
    const data = { exe1, exe2, exe3 };
    return data;
};
const remove = async (params) => {
    const { id } = params;
    const sql = `DELETE from luatsu where ID=?`;
    const data = await db.queryOne(sql, [id]);
    return data;
};
module.exports = {
    getList,
    getList2,
    getInfo,
    getLinhVuc,
    getLuatsuTheoLinhvuc,
    getLuatsuTheoIdLinhvuc,
    getTrinhdo,
    postDanhgia,
    updateInfo,
    create,
    remove,
};
