const db = require('../utils/db');

const getResults = async ({idExam}) => {
    const listeningSql = `select DBT.id, CH.So,  DBT.id_BaiThi, CH.id as id_CauHoi, CH.NoiDung as DapAn, DBT.Diem, CH.NoiDung as CauHoi
    from D_BaiThi as DBT, CauHoi as CH,  subPart as P 
    where DBT.id_CauHoi = CH.id and CH.id_SubPart = P.id and P.id_Part = 'L' and id_BaiThi = ?`;
    const listening = await db.query(listeningSql, [idExam]);
    const countListeningExact = ` select count(DBT.id) as countListening
    from D_BaiThi as DBT, CauHoi as CH,  subPart as P 
    where DBT.id_CauHoi = CH.id and CH.id_SubPart = P.id and P.id_Part = 'L' and DBT.Diem != 0 and id_BaiThi = ?`;
    const {countListening} = await db.queryOne(countListeningExact, [idExam]);
    const readingSql = `select DBT.id, CH.So,  DBT.id_BaiThi, CH.id as id_CauHoi, CH.NoiDung as DapAn, DBT.Diem, CH.NoiDung as CauHoi
    from D_BaiThi as DBT, CauHoi as CH,  subPart as P 
    where DBT.id_CauHoi = CH.id and CH.id_SubPart = P.id and P.id_Part = 'R' and id_BaiThi = ?`;
    const reading = await db.query(readingSql, [idExam]);
    const countReadingExact = ` select count(DBT.id) as countReading
    from D_BaiThi as DBT, CauHoi as CH,  subPart as P 
    where DBT.id_CauHoi = CH.id and CH.id_SubPart = P.id and P.id_Part = 'R' and DBT.Diem != 0 and id_BaiThi = ?`;
    const {countReading} = await db.queryOne(countReadingExact, [idExam]);
    const totalPointWriting = `select sum(DBT.Diem) as totalWriting
    from D_BaiThi as DBT, CauHoi as CH,  subPart as P 
    where DBT.id_CauHoi = CH.id and CH.id_SubPart = P.id and P.id_Part = 'W' and id_BaiThi = ?`;
    const {totalWriting} = await db.queryOne(totalPointWriting, [idExam]);
    const totalPointSpeaking = `select sum(DBT.Diem) as totalSpeaking
    from D_BaiThi as DBT, CauHoi as CH,  subPart as P 
    where DBT.id_CauHoi = CH.id and CH.id_SubPart = P.id and P.id_Part = 'S' and id_BaiThi = ?`;
    const {totalSpeaking} = await db.queryOne(totalPointSpeaking, [idExam]);
    const result = [
        {idPart: 'L' , countExact: countListening, data: listening},
        {idPart: 'R', countExact: countReading, data: reading},
        {idPart: 'W',  data: totalWriting},
        {idPart: 'S',  data: totalSpeaking},

    ]
    return result;
}

const create = async ({id_BaiThi, id_CauHoi}) => {
    const sql = `insert into D_BaiThi(id_BaiThi, id_CauHoi, NoiDung)
    values(?, ?, '')`;
    await db.queryOne(sql, [id_BaiThi, id_CauHoi])
    return 'D_BaiThi successfully created'
}

const update = async ({idQuestion, idBaiThi, NoiDung, idPart}) => {
    const getCauHoi = `select * from CauHoi where id = ?`;
    const cauHoi = await db.queryOne(getCauHoi, [idQuestion]);
    
    if(cauHoi.DapAn === NoiDung && !idPart){
        const sql = `update D_BaiThi set NoiDung = ?, Diem = ? where id_BaiThi = ? and id_CauHoi = ? `;
        await db.queryOne(sql, [NoiDung, cauHoi.Diem, idBaiThi, idQuestion])
    }else{
        const sql = `update D_BaiThi set NoiDung = ?, Diem = ? where id_BaiThi = ? and id_CauHoi = ? `;
        await db.queryOne(sql, [NoiDung, 0, idBaiThi, idQuestion])
    } 
}

module.exports = {
    getResults,
    create,
    update
}

