const path = require('path');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const File = require('../models/File');
const Applicant = require('../models/Applicant');
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

Router.post('/upload', authA, upload.fields([
  { name: 'ssc_cert', maxCount: 1 },
  { name: 'hsc_cert', maxCount: 1 },
  { name: 'aadhar', maxCount: 1 },
  { name: 'cet', maxCount: 1 },
]), async (req, res) => {
  try {
    const id = req.user.id; // Get the user ID from the authenticated request

    // Ensure files are uploaded
    if (!req.files || !req.files.ssc_cert || !req.files.hsc_cert || !req.files.aadhar || !req.files.cet) {
      return res.status(400).send('All files must be uploaded.');
    }

    // Extract file details from the request
    const ssc_file = req.files.ssc_cert[0];
    const hsc_file = req.files.hsc_cert[0];
    const aadhar_file = req.files.aadhar[0];
    const cet_file = req.files.cet[0];

    // Create file entries in the database
    const fileDocuments = [
      new File({
        user_id: id,
        file_path: ssc_file.path,
        file_mimetype: ssc_file.mimetype,
      }),
      new File({
        user_id: id,
        file_path: hsc_file.path,
        file_mimetype: hsc_file.mimetype,
      }),
      new File({
        user_id: id,
        file_path: aadhar_file.path,
        file_mimetype: aadhar_file.mimetype,
      }),
      new File({
        user_id: id,
        file_path: cet_file.path,
        file_mimetype: cet_file.mimetype,
      }),
    ];

    // Save each file document to the database
    for (const fileDoc of fileDocuments) {
      await fileDoc.save();
    }

    // Update the Applicant with the uploaded file paths and types
    await Applicant.findOneAndUpdate(
      { user_id: id },
      {
        $set: {
          ssc_cert_path: ssc_file.path,
          ssc_cert_mimetype: ssc_file.mimetype,
          hsc_cert_path: hsc_file.path,
          hsc_cert_mimetype: hsc_file.mimetype,
          aadhar_path: aadhar_file.path,
          aadhar_mimetype: aadhar_file.mimetype,
          cet_path: cet_file.path,
          cet_mimetype: cet_file.mimetype,
        },
      },
      { new: true }
    );

    res.send('Files uploaded successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error while uploading files. Try again later.');
  }
});

  Router.get('/download/:id/:fileType', async (req, res) => {
      const applicant = await Applicant.findOne({ _id: req.params.id });
      const fileType = req.params.fileType;
      let filePath;
      let fileMimetype;
  
      if (fileType == "ssc") {
          filePath = applicant.ssc_cert_path;
      } else if (fileType == "hsc") {
          filePath = applicant.hsc_cert_path;
      } else if (fileType == "aadhar") {
          filePath = applicant.aadhar_path;
      } else if (fileType == "cet") {
          filePath = applicant.cet_path;
      } else {
          return res.status(400).send('Invalid file type.');
      }
  
      try {
          const file = await File.findOne({ file_path: filePath });
          if (!file) {
              return res.status(404).send('File not found in database.');
          }
  
          fileMimetype = file.file_mimetype;
          const completeFilePath = path.join(__dirname, '..', file.file_path);
          
          // Check if the file exists
          if (!fs.existsSync(completeFilePath)) {
              return res.status(404).send('File not found on server.');
          }
  
          res.set({
              'Content-Type': fileMimetype || 'application/octet-stream'
          });
          res.sendFile(completeFilePath);
      } catch (error) {
          console.error(error);
          res.status(400).send('Error while downloading file. Try again later.');
      }
  });
  

module.exports = Router;
