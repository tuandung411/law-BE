const db = require("../utils/db");

const dangKi = async ({ userID, law, email, content, price, file, date }) => {
    console.log(date);
    const sql = `insert tuvanemail(maKH,linhvuc,email,noidung,gia,file,ngaytao,tinhTrang) values(?,?,?,?,?,?,?,0) `;
    if (price === "1") {
        price = "300.000đ";
    } else if (price === "2") {
        price = "500.000đ";
    } else if (price === "3") {
        price = "800.000đ";
    }
    const data = await db.query(sql, [
        userID,
        law,
        email,
        content,
        price,
        file,
        date,
    ]);
    // console.log(data);
    return data;
};
const dangKi2 = async ({ userID, law, mail, content, price, date }) => {
    console.log(mail);
    const sql = `insert tuvanemail(maKH,linhvuc,email,noidung,gia,ngaytao,tinhTrang) values(?,?,?,?,?,?,0) `;
    if (price === "1" || price === 1) {
        price = "300.000đ";
    } else if (price === "2" || price === 2) {
        price = "500.000đ";
    } else if (price === "3" || price === 3) {
        price = "800.000đ";
    }
    if (law === 1) {
        law = "Dân sư";
    } else if (law === 2) {
        law = "Hình sự";
    } else if (law === 3) {
        law = "Hôn nhân và gia đình";
    } else if (law === 4) {
        law = "Kinh tế";
    } else if (law === 5) {
        law = "Hành chính";
    } else if (law === 6) {
        law = "Đất đai";
    } else if (law === 7) {
        law = "Tài chính";
    }

    const data = await db.query(sql, [userID, law, mail, content, price, date]);
    // console.log(data);
    return data;
};
const getList = async () => {
    const sql1 = `select * from tuvanemail `;
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
    const sql1 = `select * from tuvanemail where ID =? `;
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
    const { id, idLS, price, status, content } = params;
    var data;
    var tinhtrang;
    if (status == false) {
        tinhtrang = 0;
    } else {
        tinhtrang = 1;
    }

    const sql1 = `UPDATE tuvanemail set maLS=?,gia=?,tinhtrang=?,noidung=? where ID =? `;
    const sql2 = `UPDATE tuvanemail set gia=?,tinhtrang=?,noidung=? where ID =? `;
    if (idLS != "UnChange") {
        data = await db.query(sql1, [idLS, price, tinhtrang, content, id]);
    } else {
        data = await db.query(sql2, [price, tinhtrang, content, id]);
    }

    return data;
};
const remove = async (params) => {
    const { id } = params;
    const sql = `DELETE from tuvanemail where ID= ? `;

    const data = await db.query(sql, [id]);
    // console.log(data);
    return data;
};

module.exports = {
    dangKi,
    dangKi2,
    getList,
    getInfo,
    update,
    remove,
};
