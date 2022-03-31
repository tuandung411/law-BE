const db = require("../utils/db");
const security = require("../utils/security");

const md5 = require("md5");
const jwt = require("jsonwebtoken");
var token = "";
const login = async ({ username, password }) => {
    const sql = `select * from admin where TaiKhoan = ? `;
    const admin = await db.queryOne(sql, [username]);
    console.log(password, username);
    if (!admin) {
        return {
            status: 400,
            data: "no info",
        };
    }
    console.log(admin);
    // const passwordValid = await argon2.verify(user.matKhau, password);
    const passwordValid = md5(password);
    if (passwordValid !== admin.matKhau) {
        return {
            status: 401,
            data: "incorrect",
        };
    }
    const accessToken = jwt.sign(
        { adminId: admin.id },
        process.env.ACCESS_TOKEN_SECRET
    );
    console.log(accessToken);
    return {
        status: 200,
        data: { token: accessToken, admin: admin },
    };
};
const register = async ({ name, username, password }) => {
    if (!username || !password) {
        return {
            status: 401,
            data: "no info",
        };
    }
    try {
        const sql = `select * from admin where TaiKhoan = ? `;
        const user = await db.queryOne(sql, [username]);
        if (user) {
            return {
                status: 402,
                data: "exist username",
            };
        }

        // const hashedPassword = await argon2.hash(password);
        const hashedPassword = md5(password);
        const sqlCreate = `insert into admin(TaiKhoan,MatKhau,Ten) VALUES(?,?,?)`;
        const newUser = await db.queryOne(sqlCreate, [
            username,
            [hashedPassword],
            name,
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

module.exports = {
    login,
    register,
};
