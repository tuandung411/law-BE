const db = require("../utils/db");
const subPartService = require("../services/subPart.service");
const cauHoiService = require("../services/cauHoi.service");

const { subParts } = require("../const/StructExam");

const get = async ({ limit, offset }, { status }) => {
    console.log(status);
    if (!status) {
        const sql = `select * from DeThi
        limit ?
        offset ?`;
        const data = await db.query(sql, [limit, offset]);

        const countSql = `select count(id) as total from DeThi`;
        const { total } = await db.queryOne(countSql);
        return {
            data,
            metadata: {
                total,
                length: data.length,
            },
        };
    } else {
        const sql = `select * from DeThi where TrangThai = ?
        limit ?
        offset ?`;
        const data = await db.query(sql, [Boolean(status), limit, offset]);

        const countSql = `select count(id) as total from DeThi where TrangThai = ?`;
        const { total } = await db.queryOne(countSql, [Boolean(status)]);
        return {
            data,
            metadata: {
                total,
                length: data.length,
            },
        };
    }
};

const getById = async (id) => {
    const sql = `select * from DeThi where id = ?`;
    const data = await db.queryOne(sql, [id]);
    return data;
};

const getPart = async ({ idExam, idPart }) => {
    const subParts = await subPartService.get({ idExam, idPart });
    for (let i = 0; i < subParts.length; i++) {
        const { id } = subParts[i];
        const cauHoi = await cauHoiService.getBySubPart({ idSubPart: id });
        subParts[i].cauHoi = cauHoi;
    }
    return subParts;
};

const create = async ({ id_LoaiDe, Ten }) => {
    const sql = `insert into DeThi(id_LoaiDe, Ten)
    values(?, ?)`;
    const { insertId } = await db.query(sql, [id_LoaiDe, Ten]);
    return insertId;
};

const createEmptyExam = async (id_DeThi) => {
    for (let i = 0; i < subParts.length; i++) {
        const { id_Part, Ten } = subParts[i];
        const id_subPart = await subPartService.create(
            id_Part,
            id_DeThi,
            Ten,
            ""
        );
        if (id_Part === "L" || id_Part === "R") {
            const { tu, den, diem } = subParts[i];
            for (let j = tu; j <= den; j++) {
                await cauHoiService.create({
                    id_Part: subParts[i].id_Part,
                    id_SubPart: id_subPart,
                    NoiDung: "",
                    So: j,
                    Diem: diem,
                    DapAn: "",
                });
            }
        } else if (id_Part === "W") {
            const { diem } = subParts[i];
            await cauHoiService.create({
                id_Part: subParts[i].id_Part,
                id_SubPart: id_subPart,
                NoiDung: "",
                So: 1,
                Diem: diem,
                DapAn: "",
            });
        } else if (id_Part === "S") {
            const { diem } = subParts[i];
            await cauHoiService.create({
                id_Part: subParts[i].id_Part,
                id_SubPart: id_subPart,
                NoiDung: "",
                So: 1,
                Diem: diem,
                DapAn: "Speaking",
            });
        }
    }
};

const deleteMany = async (id) => {
    for (let i = 0; i < id.length; i++) {
        const sql = `delete from DeThi where id = ?`;
        await db.queryOne(sql, [id[i]]);
    }
    return "dethi successfully deleted";
};

const changeStatus = async ({ id, status }) => {
    const sql = `update DeThi set TrangThai = ? where id = ?`;
    await db.queryOne(sql, [Boolean(status), id]);
    const data = await getById(id);
    return data;
};

module.exports = {
    get,
    getById,
    getPart,
    create,
    createEmptyExam,
    deleteMany,
    changeStatus,
};
