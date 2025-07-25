import multer from "multer";

const allowdFileType = ['image/jpg', 'image/png', 'image/jpeg'];
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        if (!allowdFileType.includes(file.mimetype)) {
            return cb(new Error("This file type is now allowded"))
        }

        cb(null, "./storage");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})

export { multer, storage};