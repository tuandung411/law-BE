const multer = require('multer')
const upload = multer({ dest: 'public/audio/' })
const fs = require('fs');

const uploads = upload.single('file');

const checkFile = (req, res, next) => {
    const file = req.file
    if (!file) {
        console.log('File not change')
        next()
    } else {
        const tailAudio = req.file.mimetype.split('/').slice(1)
        const addTail = req.file.path.concat('.', tailAudio)
        fs.rename(req.file.path, addTail, (err) => {
            if (err) next(err)
            console.log('Upload file successfully')
            req.body.file = addTail.split('/').slice(1).join('/')
            next()
        })
    }
}

module.exports = {
    uploads,
    checkFile
}