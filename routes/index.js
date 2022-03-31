const userRoute = require("./user.route");
const authRoute = require("./auth.route");
const adminRoute = require("./admin.route");
const luatSuRoute = require("./luatSu.route");
const dienThoaiRoute = require("./dienThoai.route");
const emailRoute = require("./email.route");
const danhGiaRoute = require("./danhGia.route");
const fileRoute = require("./file.route");
const route = (app) => {
    app.use("/api/user", userRoute);
    app.use("/api/auth", authRoute);
    app.use("/api/admin", adminRoute);
    app.use("/api/luatSu", luatSuRoute);
    app.use("/api/dienThoai", dienThoaiRoute);
    app.use("/api/email", emailRoute);
    app.use("/api/danhGia", danhGiaRoute);
    app.use("/api/file", fileRoute);
};

module.exports = route;
