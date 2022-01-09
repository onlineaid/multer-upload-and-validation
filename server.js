const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
const multer = require('multer')
const path = require('path');


const app = express()

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './upload')
    },
    filename: (req, file, cb) => {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName)
    }
    // filename: (req, file, cd) => {
    //     cd(null, 'online' + '-' + Date.now() + path.extname(file.originalname)) 
    // }
})

const upload = multer({
    storage: fileStorageEngine,
    limits: {
        fileSize: 1000000,
    },
    
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
        } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
}) 

app.post('/single', upload.single('image'), (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'img uplode'
    })
})

app.post('/multi', upload.array('image', 3), (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'img uplode'
    })
})

const PORT = 4000

app.listen(PORT, console.log(`Server running in ${PORT}`))