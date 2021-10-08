const db = require("../utils/db");
const deThiService = require("./deThi.service");
const DBaiThiService = require("./D_BaiThi.service");

const getListExam = async ({ username }) => {
    const sql = `select BaiThi.id,BaiThi.id_DeThi, DATE_FORMAT(BaiThi.NgayTao,'%d/%m/%Y') as NgayTao , BaiThi.TrangThai, DeThi.Ten  
    from BaiThi, DeThi 
    where BaiThi.id_DeThi = DeThi.id and TaiKhoan = ?
    order by BaiThi.NgayTao DESC`;
    const data = await db.query(sql, [username]);
    return data;
};

const createEmptyExam = async ({ idExam }, { username }) => {
    const parts = ["L", "R", "W", "S"];
    const idBaiThi = await create({ id_DeThi: idExam, TaiKhoan: username });

    for (let i = 0; i < parts.length; i++) {
        const part = await deThiService.getPart({
            idExam: idExam,
            idPart: parts[i],
        });
        for (let j = 0; j < part.length; j++) {
            for (let k = 0; k < part[j].cauHoi.length; k++) {
                await DBaiThiService.create({
                    id_BaiThi: idBaiThi,
                    id_CauHoi: part[j].cauHoi[k].id,
                });
            }
        }
    }

    return idBaiThi;
};

const create = async ({ id_DeThi, TaiKhoan }) => {
    const sql = `insert into BaiThi(id_DeThi, TaiKhoan)
    values(?, ?)`;
    const { insertId } = await db.query(sql, [id_DeThi, TaiKhoan]);
    return insertId;
};

module.exports = {
    getListExam,
    createEmptyExam,
};
