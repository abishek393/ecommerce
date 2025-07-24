import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const allowdedFileType = ['image/jpg', 'image/png', 'image/jpeg'];
        if (!allowdedFileType.includes(file.mimetype)) {
            cb(new Error("This file type is now allowded"))
        }

        cb(null, "./storage");
    }
    ,
    filename: function(req, file , cb){
        cb(null, Date.now()+ "-" + file.originalname)
    }
})

export default { multer, storage };