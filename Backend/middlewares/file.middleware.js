const multer = require("multer")


const upload = multer({
    storage: multer.memoryStorage(),
    limits:{
        fileSize: 3 * 1024 * 1024 //The pdf should be of maximum size 3mb
    }
})

module.exports = upload