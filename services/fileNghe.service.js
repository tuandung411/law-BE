const db = require('../utils/db');
const fs = require('fs');

const getById = async (id) => {
    const sql = `select * from FileNghe where id = ?`;
    const data = await db.queryOne(sql, [id])
    return data;
}

const getByExam = async (idExam) => {
    const sql = `select * from FileNghe where id_DeThi = ?`;
    const data = await db.queryOne(sql, [idExam]);
    return data;
}

const create = async ({file}, idExam) => {
    const isExistsSql = `select * from FileNghe where id_DeThi = ?`
    const isExists = await db.queryOne(isExistsSql, [idExam]);

    if(!isExists){
        const sql = `insert into FileNghe(id_DeThi, url)
        values(?, ?)`;
        await db.queryOne(sql, [idExam, file]);
        return 'create file nghe susscessfully';
    }else{
        const sql = `update FileNghe set url = ? where id = ?`;
        await db.queryOne(sql, [file, isExists.id]);

        fs.unlinkSync(__dirname.replace('services', '').concat(`public/${isExists.url}`));
        
        return 'update file nghe susscessfully';

    }
    
}

module.exports ={ 
    getById,
    getByExam,
    create
}