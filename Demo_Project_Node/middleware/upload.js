const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const path = require('path');
const uuid = require('uuid').v4;
const Report=require('../models/Report');
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"upload");
    

  },
  filename: (req, file, cb) => {
    
    const ext=path.extname(file.originalname)
    const id=uuid();
    const filepath=`documents/${id}${ext}`; 
    Report.create({filepath})
                .then(()=>{
              cb(null,filepath)
              })

    console.log(file.originalname);
    cb(null, file.originalname);
  },
  
});


const fileFilter = function(req, file, cb) {
    // Accept doc|pdf only
    if (!file.originalname.match(/\.(pdf|doc|docx)$/)) {
        req.fileValidationError = 'Only doc or pdf  files are allowed!';
        return cb(new Error('Only doc or pdf files are allowed!'), false);
    }
    cb(null, true);
};

var uploadFile = multer({
  storage: storage,
  fileFilter:fileFilter,
  limits: { fileSize: maxSize }
}).fields([{name:'file'},{name:'file'}]);

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;