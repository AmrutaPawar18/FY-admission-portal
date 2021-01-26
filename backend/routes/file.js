const path = require('path');
const express = require('express');
const multer = require('multer');
const File = require('../models/File');
const Router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, './uploads');
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 5000000 // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
        )
      );
    }
    cb(undefined, true); // continue with upload
  }
});

const authA = require('../middleware/authAppl.js');
Router.post(
  '/upload',authA,
  upload.fields([{ name:'file', maxCount:1}, {name:'cv', maxCount:1}]),
  async (req, res) => {
    try {
      const id = req.user.id;
    //  console.log(req)
      const { path, mimetype } = req.files.file[0];
      const { cvpath, cvmimetype} = req.files.cv[0];
      console.log(path)
      const file = new File({
        user_id:id,
        file_path: path,
        file_mimetype: mimetype
      });
      await file.save();
      await Applicant.findOneAndUpdate({user_id: id}, {$set:{pic_path: path,
        pic_mimetype: mimetype, cv_path:cvpath, cv_mimetype:cvmimetype}}, {new:true})
      res.send('file uploaded successfully.');
    } catch (error) {
      console.log(error)
      res.status(400).send('Error while uploading file. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

Router.get('/download/:id', async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      'Content-Type': file.file_mimetype
    });
    res.sendFile(path.join(__dirname, '..', file.file_path));
  } catch (error) {
    res.status(400).send('Error while downloading file. Try again later.');
  }
});

module.exports = Router;
