const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const passport = require('passport');
const multer = require('multer');

const DIR = './public/';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
});

let upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})

router.post('/login', userController.userLogin);

router.post('/register', userController.registerUser);

router.post('/admin/fileupload',
    passport.authenticate('jwt', { session: false }),
    upload.single('file'), (req, res, next) => {
        try {
            const url = req.protocol + '://' + req.get('host') + '/public/' + req.file.filename;
            return res.status(200).json({
                message: "File uploaded successfully",
                status: true,
                file: url
            });
        } catch (error) {
            return res.status(500).json({
                message: "Something went wrong!",
                status: false,
                error: error,
            });
        }
    })

module.exports = router;