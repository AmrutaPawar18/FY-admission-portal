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

// Load models
const Job = require("../models/Job");
const Recruiter = require("../models/Recruiter");
const Application = require("../models/Application")

// GET request 
// Getting all active jobs (jobs with max positions not filled(maxPos>posn_filled))
router.get("/", authR, function(req, res) {
    var id= req.user.id
    Job.find({recr_id:id})//, $expr:{$gt:["$maxPos","$posn_filled"]}})
        .then(jobs => {
		  var filt = jobs.filter(job=>(job.maxPos>job.posn_filled))
		  res.json(filt);
	})
});

// route: recr/newJob    
// PRIVATE
// POST request 
// Add a job to db
router.post("/newJob", authR, (req, res) => {
	const newJob = new Job(req.body);
	newJob.recr_id = req.user.id;
	console.log(req.user);
	newJob.save()
        .then(job => {
            res.status(200).json(job);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: recr/updateJob  
// PRIVATE
// POST request 
// Update job details 
router.post("/updateJob", authR, (req, res) => {
    const _id = req.user.id;
    const maxAppl = req.body.maxAppl;
    const maxPos = req.body.maxPos;
    const jobId = req.body.id;
    const deadline = req.body.deadline;
    Job.updateOne({_id: jobId}, { 
        $set: {
            maxPos:maxPos, 
            maxAppl:maxAppl, 
            deadline:deadline}})
        .then(savedJob => {

            res.status(200).json(savedJob);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: recr/deleteJob  
// PRIVATE
// DELETE request 
// Delete job
router.delete("/deleteJob/:id", authR, async (req, res) => {
    const _id = req.user.id;
    const jobId = req.params.id;
    await Job.deleteOne({_id: jobId})
        .then(out => {

        //    res.status(200).json(out);
        })
        .catch(err => {
            return res.status(400).send(err);
        });

    // update stage of all applications with this job id
    Application.updateMany({job_id:jobId},{$set: {stage: "Job deleted"}},(err,result)=>{
        if(err)
            res.status(400).send(err)
        else res.status(200).json({mess:"Deleted"})
    })

    });


// route: recr/updateProfile   
// PRIVATE
// PATCH request 
// Update profile 
router.patch("/updateProfile", authR, (req, res) => {
    const _id = req.user.id;
    const contact = req.body.contact;
    const bio = req.body.bio;
    Recruiter.updateOne({user_id: _id}, { $set: {contact:contact, bio:bio}})
        .then(savedPro => {

            res.status(200).json(savedPro);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });


// route: recr/profile
// PRIVATE
// GET request 
// Get recruiter profile details from db
router.get("/profile", authR, function(req, res) {

    var id = req.user.id;
    Recruiter.findOne({user_id: id})
        .populate('user_id','email fname lname')
        .then(pro => {
            res.status(200).json(pro);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: recr/newProfile   
// PRIVATE
// POST request 
// Add a profile to db
router.post("/newProfile", authR, (req, res) => {
	const newProfile = new Recruiter(req.body);
	newProfile.user_id = req.user.id;
	console.log(req.user);
	newProfile.save()
        .then(pro => {
            res.status(200).json(pro);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: recr/applications
// PRIVATE
// POST request 
// Get non-rejected applications for a job from db
router.post("/applications", authR, function(req, res) {

    var id = req.user.id;
    var jobId = req.body.id
    Application.find({job_id: jobId, stage:{$ne: "Rejected"}})
        .populate('appl_user_id','fname lname')
        .populate('appl_id','rating')
        .then(appls => {
            res.status(200).json(appls);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: recr/accept
// PRIVATE
// POST request 
// Accept an applicant, 
// reject all other applications of that applicant, 
//incr posn_filled of job
//(if now all positions have been filled then reject all applications for this job)
router.post("/accept", authR, async function(req, res) {

    var id = req.user.id;
    var applicationId = req.body.id;
    var appl_user_id = req.body.appl_user_id;
    const jobId = req.body.jobId;
    var c= 0;
    await Application.updateOne({_id: applicationId}, {$set:{stage:"Accepted",doj:Date.now()}})
        .then(appl => {
        //    res.status(200).json(appl);
        })
        .catch(err => {
            return res.status(400).send(err);
        });
    await Application.updateMany({appl_user_id:appl_user_id, _id:{$ne:applicationId}},{$set: {stage: "Rejected"}},(err,result)=>{
        if(err)
            return res.status(400).send(err)
    //    else res.status(200).json({mess:"Updated"})
    });

    await Job.findOneAndUpdate({_id:jobId}, {$inc : {'posn_filled': 1}},{new:true})
        .then(j => {
            if(j.posn_filled<j.maxPos){
                c=1;
                return res.status(200).json({mess:"Updated"})
            }
        })
        .catch(err=> {
            return res.status(400).send(err);
    });
    //reject all applications, return a message for recruiter
    if(c==0){
        Application.updateMany({job_id:jobId, stage:{$ne:"Accepted"}},{$set: {stage: "Rejected"}},(err,result)=>{
            if(err)
                return res.status(400).send(err)
            else res.status(200).json({mess:"All positions for this job have been filled!"})
        })
    }
});


// route: recr/shortlist
// PRIVATE
// POST request 
// Shortlist an applicant
router.post("/shortlist", authR, function(req, res) {

    var id = req.user.id;
    var applicationId = req.body.id;
    Application.findOneAndUpdate({_id: applicationId}, {$set:{stage:"Shortlisted"}},{new:true})
        .populate('appl_user_id','fname lname')
        .then(appl => {
            res.status(200).json(appl);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: recr/employees
// PRIVATE
// GET request 
// Get employee details from db
router.get("/employees", authR, function(req, res) {

    var id = req.user.id;
    Application.find({recr_id: id, stage:"Accepted"})
        .populate('appl_user_id','fname lname')
        .populate('appl_id','rating')
        .then(pro => {
            res.status(200).json(pro);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: recr/rate/:id
// PRIVATE
// POST request 
// Save employee rating in db
router.post("/rate/:id", authR, async function(req, res) {

    var id = req.user.id;   //recruiter id
    console.log(id)
    var aId= req.params.id; //application id
    var rating= req.body.rating;
    
    Application.findOneAndUpdate({_id: aId}, {$set:{appl_rating:rating}},{new:true})
        .then(pro => {
            Application.aggregate([
                {$match:{$and:[{appl_rating:{$gt:0}}, {appl_user_id:pro.appl_user_id}]}},
                {$group:{_id:"$appl_user_id", rate: {$avg: "$appl_rating"}}}
            ])
            .then(x=>{
                console.log(x)
                // console.log(pro.appl_user_id)
                // console.log(typeof pro.appl_user_id);
                // console.log(x[0]._id);
                // console.log(x[0]._id===pro.appl_user_id)
                // var y= x.filter(e => e._id===pro.appl_user_id)
                // console.log(y)
                Applicant.findOneAndUpdate({user_id:x[0]._id},{$set:{rating:x[0].rate}},{new:true})
                    .then(p=>res.json(p))
            })
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

router.put("/check", function(req,res){
    var id=req.body.id
    Application.aggregate([
        {$match:{appl_rating:{$gt:0}}},
        {$group:{_id:"$appl_user_id", rate: {$avg: "$appl_rating"}}}
    ]).then(x=>{
        var y= x.filter(e=>e._id==id)
        Applicant.findOneAndUpdate({user_id:id},{$set:{rating:y[0].rate}})
    .then(p=>res.json(p))})
})



module.exports = router;
