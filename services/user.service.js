const db = require("../utils/db");
// const codeService = require('./code.service');

const getInfo = async ({ username }) => {
    const sql = `select Email, NgaySinh, SDT, Ten from User where TaiKhoan = ?`;
    const data = await db.queryOne(sql, [username]);
    return data;
};

const create = async ({
    name,
    username,
    password,
    birthDay,
    phoneNumber,
    email,
    code,
}) => {
    const checkCode = `select * from Code where id = ?`;
    const isExistCode = await db.queryOne(checkCode, [code]);

    if (!isExistCode) {
        return {
            status: 403,
            mess: "Code dont exist!",
        };
    }

    const checkUser = `select * from User where TaiKhoan = ?`;
    const isExistUser = await db.queryOne(checkUser, [username]);
    if (isExistUser) {
        return {
            status: 409,
            mess: "Account already exists!",
        };
    }

    const sql = `insert into User(TaiKhoan, MatKhau, Ten, NgaySinh, SDT, Email, id_Role)
    values(?, ?, ?, ?, ?, ?, ?)`;
    await db.query(sql, [
        username,
        password,
        name,
        birthDay,
        phoneNumber,
        email,
        "U",
    ]);
    codeService.deleteMany({ id: [code] });

    return {
        status: 200,
        mess: "Account successfully created!",
    };
};

const update = async ({ Ten, SDT, NgaySinh, Email }, username) => {
    const sql = `update User set Ten = ?, SDT = ?, NgaySinh = ?, Email = ? where TaiKhoan = ? `;
    await db.queryOne(sql, [Ten, SDT, NgaySinh, Email, username]);
    return "upate User successfully";
};

const changPassword = async (
    { oldPassword, newPassword, reNewPassword },
    { username }
) => {
    const sqlIsAuth = `select * from User where TaiKhoan = ? and MatKhau = ?`;
    const isAuth = await db.queryOne(sqlIsAuth, [username, oldPassword]);
    if (!isAuth) {
        return {
            status: 401,
            mess: "Unauthorized",
        };
    } else {
        const sqlChangePassword = `update User set MatKhau = ? where TaiKhoan = ?`;
        await db.queryOne(sqlChangePassword, [newPassword, username]);
        return {
            status: 200,
            mess: " change password successfully",
        };
    }
};

module.exports = {
    getInfo,
    create,
    update,
    changPassword,
};
