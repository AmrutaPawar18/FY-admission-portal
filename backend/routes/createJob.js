var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth.js');

const authR = require('../middleware/authRecr.js');

//JSON web token to send encrypted data between frontend and backend
// contains header(algo and token type), payload(data), verify signature
// payload usually has our data, the iat(issued at time) and expiry time

const secret = require('../config/keys').secret;
//this secret will be used to create jwt

// Load User model
const Job = require("../models/Job");

// GET request 
// Getting all the jobs
router.get("/", function(req, res) {
    Job.find(function(err, jobs) {
		if (err) {
			console.log(err);
		} else {
			res.json(jobs);
		}
	})
});

// route: recr#/createJob    
// PRIVATE
// POST request 
// Add a job to db
router.post("/newJob", authR, (req, res) => {
	const newJob = new Job(req.body);
	newJob.recr_id = req.user.id;
	console.log(req.user);
	newJob.save()
        .then(job => {
            res.status(200).json({job});
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

module.exports = router;
