const db = require("../utils/db");
// const codeService = require('./code.service');

const dangKi = async ({ userID, maDV, date }) => {
    var gia;
    switch (maDV) {
        case 1:
            gia = "200.000đ";
            break;
        case 2:
            gia = "400.000đ";
            break;
        case 3:
            gia = "800.000đ";
            break;
        default:
            gia = "200.000đ";
            break;
    }
    const sql = `insert tuvandienthoai(gia,maKH,ngaytao,tinhtrang) values(?,?,?,0) `;
    const data = await db.query(sql, [gia, userID, date]);

    return data;
};
const getList = async () => {
    const sql1 = `select * from tuvandienthoai `;
    const sql2 = `select ten from luatsu where ID=?`;

    const data1 = await db.query(sql1);
    // const data2 = await db.query(sql2, [2]);

    const length = data1.length;
    const getTen = async () => {
        var data = [];
        const promises = await data1.map(async (item) => {
            var maLS = item.maLS;
            if (maLS) {
                const data2 = await db.query(sql2, [maLS]);

                return { ...item, tenLS: data2[0].ten };
            } else {
                return { ...item, tenLS: "" };
            }
        });
        return Promise.all(promises).then((values) => {
            return values;
        });
    };
    const data = await getTen();

    return data;
};
const getInfo = async (params) => {
    const { id } = params;
    const sql1 = `select * from tuvandienthoai where ID =? `;
    const sql2 = `select ten from luatsu where ID=?`;

    const data1 = await db.query(sql1, [id]);

    var maLS = data1[0].maLS;
    const getTen = async () => {
        if (maLS) {
            const data2 = await db.query(sql2, [maLS]);
            console.log(data2);
            return { ...data1[0], tenLS: data2[0].ten };
        } else {
            return { ...data1[0], tenLS: "" };
        }
    };
    const data = await getTen();

    return data;
};
const update = async (params) => {
    const { id, idLS, price, status } = params;
    var data = "";
    var gia;
    var tinhtrang;
    if (status == false) {
        tinhtrang = 0;
    } else {
        tinhtrang = 1;
    }
    switch (price) {
        case 1:
            gia = "200.000đ";
            break;
        case 2:
            gia = "400.000đ";
            break;
        case 3:
            gia = "800.000đ";
            break;
    }
    const sql1 = `UPDATE tuvandienthoai set maLS=?,gia=?,tinhtrang=? where ID =? `;
    const sql2 = `UPDATE tuvandienthoai set gia=?,tinhtrang=? where ID =? `;

    if (idLS != "UnChange") {
        data = await db.query(sql1, [idLS, price, tinhtrang, id]);
    } else {
        data = await db.query(sql2, [price, tinhtrang, id]);
    }
    return data;
};
const remove = async (params) => {
    const { id } = params;
    const sql = `DELETE from tuvandienthoai where ID= ? `;

    const data = await db.query(sql, [id]);
    // console.log(data);
    return data;
};

module.exports = {
    dangKi,
    getList,
    getInfo,
    update,
    remove,
};
