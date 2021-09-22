const db = require('../utils/db');

const get = async ({idExam, idPart}) => {
    const sql = `select * from subPart 
    where id_DeThi = ? and id_Part = ?;`
    const data = await db.query(sql, [idExam, idPart]);
    return data; 
}

const create = async (id_Part, id_DeThi, Ten, NoiDung) => {
    const sql = `insert into subPart( id_Part, id_DeThi, Ten, NoiDung)
    values(?, ?, ?, ?)`
    const {insertId} = await db.query(sql, [id_Part, id_DeThi, Ten, NoiDung])
    return insertId;
}

const update = async ({NoiDung}, id) => {
    const sql = `update subPart set NoiDung = ? where id = ?`;
    await db.queryOne(sql, [NoiDung, id])
    return 'update subPart successfully'
}

module.exports = {
    get,
    create,
    update
}