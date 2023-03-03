const { request } = require('express');
const multer = require('multer')

const imageFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb("Please upload only images.", false);
    }
  };

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/image/user')
  },
  filename: (req, file, cb) => {
    const { originalname } = file
    const session = req.session
    if(session && session.user){
        fileName = session.user.username + Date.now() + originalname.slice(-5)
        cb(null, fileName)
    }
  }
})
module.exports = multer({ storage: storage, fileFilter:imageFilter})
