const deThiRoute = require('./deThi.route');
const thoiGianRoute = require('./thoiGian.route');
const cauHoiRoute = require('./cahHoi.route');
const DCauHoiRoute = require('./DCauHoi.route');
const subPartRoute = require('./subPart.route');
const fileNgheRoute = require('./fileNghe.route');
const codeRoute = require('./code.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');
const baiThiRoute = require('./baiThi.route');
const DBaiThiRoute = require('./DBaiThi.route');

const route = (app) => {
    app.use('/api/deThi', deThiRoute);
    app.use('/api/thoiGian', thoiGianRoute);
    app.use('/api/cauHoi', cauHoiRoute);
    app.use('/api/DCauHoi', DCauHoiRoute);
    app.use('/api/subPart', subPartRoute);
    app.use('/api/fileNghe', fileNgheRoute);
    app.use('/api/code', codeRoute);
    app.use('/api/user', userRoute);
    app.use('/api/auth', authRoute);
    app.use('/api/baiThi', baiThiRoute);
    app.use('/api/DBaiThi', DBaiThiRoute);
}

module.exports = route;