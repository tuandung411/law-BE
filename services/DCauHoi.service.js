const db = require('../utils/db');

const getByQuestion = async (idQuestion) => {
    const sql = `select * from D_CauHoi where id_CauHoi = ?`;
    const data = await db.query(sql, [idQuestion]);
    return data;
}

const create = async ({idCauHoi, NoiDung}) => {
    const sql = `insert into D_CauHoi(id_CauHoi, NoiDung)
    values(?, ?)`;
    await db.queryOne(sql, [idCauHoi, NoiDung]);
}

const update = async ({NoiDung}, id) => {
    const sql = `update D_CauHoi set NoiDung = ? where id = ?`;
    await db.queryOne(sql, [NoiDung, id]);
    return 'update D_CauHoi succsessfully';
}

module.exports = {
    getByQuestion,
    create,
    update
}