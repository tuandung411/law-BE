const db = require("../utils/db");
const DCauHoiService = require("./DCauHoi.service");

const getBySubPart = async ({ idSubPart }) => {
    const sql = `select * from CauHoi where id_SubPart = ?`;
    const data = await db.query(sql, [idSubPart]);
    return data;
};
const getResultById = async (idCauHoi) => {
    const sql = `select * from CauHoi where id = ?`;
    const data = await db.queryOne(sql, [idCauHoi]);

    return data;
};
const create = async ({ id_Part, id_SubPart, NoiDung, So, Diem, DapAn }) => {
    const sql = `insert into CauHoi(id_SubPart, NoiDung, So, Diem, DapAn)
    values(?, ?, ?, ?, ?)`;
    const { insertId } = await db.query(sql, [
        id_SubPart,
        NoiDung,
        So,
        Diem,
        DapAn,
    ]);
    if (id_Part === "L" || id_Part === "R") {
        for (let i = 0; i < 4; i++) {
            DCauHoiService.create({ idCauHoi: insertId, NoiDung: "" });
        }
    }
};

const update = async ({ NoiDung, DapAn }, id) => {
    const sql = `update CauHoi set NoiDung = ?, DapAn = ? where id = ?`;
    await db.queryOne(sql, [NoiDung, DapAn, id]);
    return "update Cau Hoi successfully";
};

module.exports = {
    getBySubPart,
    getResultById,
    create,
    update,
};
