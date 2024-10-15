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
Router.post('/upload',authA,
  upload.fields([{ name:'ssc_cert', maxCount:1}, {name:'hsc_cert', maxCount:1}]),
  async (req, res) => {
    try {
      const id = req.user.id;
    //  console.log(req)
      const { ssc_path, ssc_mimetype } = req.files.ssc_cert[0];
      const { hsc_path, hsc_mimetype} = req.files.hsc_cert[0];
      const { aadhar_path, aadhar_mimetype} = req.files.aadhar[0];
      const { cet_path, cet_mimetype} = req.files.cet[0];
      console.log(path)
      const ssc_cert = new File({
        user_id:id,
        file_path: ssc_path,
        file_mimetype: ssc_mimetype
      });
      await ssc_cert.save();
      const hsc_cert = new File({
        user_id:id,
        file_path: hsc_path,
        file_mimetype: hsc_mimetype
      });
      await hsc_cert.save();
      const aadhar = new File({
        user_id:id,
        file_path: aadhar_path,
        file_mimetype: aadhar_mimetype
      });
      await aadhar.save();
      const cet = new File({
        user_id:id,
        file_path: cet_path,
        file_mimetype: cet_mimetype
      });
      await cet.save();
      await Applicant.findOneAndUpdate({user_id: id}, {$set:{ssc_cert_path: ssc_path,
        ssc_cert_mimetype: ssc_mimetype, hsc_cert_path:hsc_path, hsc_cert_mimetype:hsc_mimetype, 
        aadhar_path:aadhar_path, aadhar_mimetype:aadhar_mimetype, cet_path:cet_path, cet_mimetype:cet_mimetype}}, {new:true})
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
