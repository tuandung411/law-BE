const db = require('../utils/db');
const { v4: uuidv4 } = require('uuid');

const get = async ({limit, offset}) => {
    const sql = `select * from Code
    limit ?
    offset ?`
    const data = await db.query(sql, [limit, offset]);

    const countSql = `select count(id) as total from Code`
    const { total } = await db.queryOne(countSql)
    return {
        data,
        metadata: {
            total,
            length: data.length
        }
    }
}

const create = async () => {
    const sql= `insert into Code(id) values (?)`;
    await db.queryOne(sql, [uuidv4()]);
    return 'Code successfully created'
}

const deleteMany = async ({id}) => {
    for(let i = 0 ; i < id.length ; i++){
        const sql = `delete from Code where id = ?`;
        await db.queryOne(sql, [id[i]]);
    }

    return 'Code successfully updated'
}

module.exports ={
    get,
    create,
    deleteMany
}