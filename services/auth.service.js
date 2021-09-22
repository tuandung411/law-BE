const db = require('../utils/db');
const security = require('../utils/security');

const login = async ({username, password, role}) => {

    const sql = `select * from User where TaiKhoan = ? and MatKhau = ? and id_Role = ?`;
    const user = await db.queryOne(sql, [username, password, role]);

    if(!user){
        return  {
            status: 401,
            data: 'Unauthorized'
        }
    } 

    return {
        status: 200,
        data: security.generateToken({username: user.TaiKhoan, role: user.id_Role})
    }
}

const auth = async (user, {role}) => {
    console.log(role);
    const sql = `select * from User where TaiKhoan = ? and id_Role = ?`;
    const isUser = await db.queryOne(sql, [user.username, role]);
    if(!isUser){
        return  {
            status: 401,
            mess: 'Unauthorized'
        }
    }
    return {
        status:200,
        mess: {
            ...isUser
        }
    }
}

module.exports = {
    login,
    auth
}