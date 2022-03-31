const db = require("../utils/db");
const security = require("../utils/security");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
var token = "";
const getList = async () => {
    const sql = "SELECT * from user";
    const data = await db.query(sql);
    console.log(data);
    return data;
};
const getUser = async (params) => {
    const { id } = params;
    const sql = `select * from user where ID = ?`;
    const exe = await db.query(sql, [id]);
    const data = exe[0];
    console.log(data);
    return data;
};
const remove = async (params) => {
    const { id } = params;
    const sql = "DELETE from user where ID=?";
    const data = await db.queryOne(sql, [id]);
    console.log(data);
    return data;
};
const update = async (params) => {
    const { id, address, phone, mail } = params;
    const sql = `UPDATE user set diaChi = ?, sdt = ?,email = ? where ID = ?`;
    const data = await db.query(sql, [address, phone, mail, id]);
    console.log(data);
    return data;
};
const login = async ({ username, password }) => {
    const sql = `select * from user where TaiKhoan = ? `;
    const user = await db.queryOne(sql, [username]);
    console.log(password, username);
    if (!user) {
        return {
            status: 401,
            data: "no info",
        };
    }
    console.log(user);
    // const passwordValid = await argon2.verify(user.matKhau, password);
    const passwordValid = md5(password);
    if (passwordValid !== user.matKhau) {
        return {
            status: 401,
            data: "incorrect",
        };
    }
    const accessToken = jwt.sign(
        { userId: user.id },
        process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken);
    return {
        status: 200,
        data: { token: accessToken, user: user },
    };
};
const register = async ({
    name,
    username,
    password,
    phoneNumber,
    email,
    address,
}) => {
    if (!username || !password) {
        return {
            status: 401,
            data: "no info",
        };
    }
    try {
        const sql = `select * from user where TaiKhoan = ? `;
        const user = await db.queryOne(sql, [username]);
        if (user) {
            return {
                status: 402,
                data: "exist username",
            };
        }

        // const hashedPassword = await argon2.hash(password);
        const hashedPassword = md5(password);
        const sqlCreate = `insert into user(TaiKhoan,MatKhau,Ten,SDT,diaChi,email) VALUES(?,?,?,?,?,?)`;
        const newUser = await db.queryOne(sqlCreate, [
            username,
            [hashedPassword],
            name,
            phoneNumber,
            address,
            email,
        ]);
        // const accessToken = jwt.sign(
        //     { userId: user.name },
        //     process.env.ACCESS_TOKEN_SECRET
        // );
        return {
            status: 200,
            data: "success",
            // token: accessToken,
            user: user,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: "error",
        };
    }
};
const register2 = async ({ phoneNumber, username, password }) => {
    if (!username || !password) {
        return {
            status: 401,
            data: "no info",
        };
    }
    try {
        const sql = `select * from user where TaiKhoan = ? `;
        const user = await db.queryOne(sql, [username]);
        if (user) {
            return {
                status: 402,
                data: "exist username",
            };
        }

        // const hashedPassword = await argon2.hash(password);
        const hashedPassword = md5(password);
        const sqlCreate = `insert into user(TaiKhoan,MatKhau,Ten,SDT,diaChi,email) VALUES(?,?,NULL,?,NULL,NULL)`;
        const newUser = await db.queryOne(sqlCreate, [
            username,
            [hashedPassword],
            phoneNumber,
        ]);
        // const accessToken = jwt.sign(
        //     { userId: user.name },
        //     process.env.ACCESS_TOKEN_SECRET
        // );
        return {
            status: 200,
            data: { mess: "success" },
            // token: accessToken,
            user: user,
        };
    } catch (error) {
        console.log(error);
        return {
            status: 500,
            data: "error",
        };
    }
};

const auth = async (user, { role }) => {
    console.log(role);
    const sql = `select * from User where TaiKhoan = ? and id_Role = ?`;
    const isUser = await db.queryOne(sql, [user.username, role]);
    if (!isUser) {
        return {
            status: 401,
            mess: "Unauthorized",
        };
    }
    return {
        status: 200,
        mess: {
            ...isUser,
        },
    };
};

module.exports = {
    login,
    register,
    register2,
    auth,
    getUser,
    getList,
    update,
    remove,
};
