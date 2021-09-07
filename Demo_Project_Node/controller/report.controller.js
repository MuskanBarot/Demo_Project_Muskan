const uploadFile = require("../middleware/upload");
const fs = require("fs");
const path=require('path')
const Report = require("../models/Report");
const mongoose=require('mongoose')
const uuid = require('uuid').v4;

const upload = async (req, res) => {
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
      
    });
  } catch (err) {
    console.log(err);

    if (err.code == "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

// const id=uuid();
// const ext=path.extname(file.originalname)
// const filepath=`documents/${id}${ext}`


// const report=new Report({
//   u_id:new mongoose.Types.ObjectId()
// })

// report.save(function (err) {
//   if (err) return handleError(err);
// });

// Report.find()
// .populate("u_id")
// .then(p=>console.log(p))
// .catch(error=>console.log(error));


module.exports={upload}