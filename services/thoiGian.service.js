const db = require('../utils/db');

const getByIdExam = async (id) => {
    const sql = `select * from ThoiGian where id_DeThi = ?`;
    const data = await db.query(sql, [id]);
    return data;
}

const create = async ({id_Part, id_DeThi, thoiGian}) => {
    const sql = `insert into ThoiGian(id_Part, id_DeThi, ThoiGian) values(?, ?, ?)`;
    await db.queryOne(sql, [id_Part, id_DeThi, thoiGian]);
    return 'create time successfully'
}

module.exports = {
    getByIdExam,
    create
}