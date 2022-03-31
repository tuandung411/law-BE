const multer = require("multer");
const upload = multer({ dest: "public/files/" });
const fs = require("fs");

const uploads = upload.single("file");

const checkFile = (req, res, next) => {
    const file = req.file;
    if (!file) {
        console.log("File not change");
        next();
    } else {
        var addTail;
        const extension = req.file.mimetype.split("/").slice(1);
        if (extension == "msword" || extension == "word") {
            addTail = req.file.path.concat(".", "doc");
        } else {
            addTail = req.file.path.concat(".", extension);
        }

        fs.rename(req.file.path, addTail, (err) => {
            if (err) next(err);
            console.log("Upload file successfully");
            // req.body.file = addTail.split(`\*`).slice(1).join("/");
            req.body.file = addTail;
            // console.log(req.body.file, "file");
            next();
        });
    }
};

module.exports = {
    uploads,
    checkFile,
};
