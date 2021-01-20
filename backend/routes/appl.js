var express = require("express");
var ObjectId = require('mongoose').Types.ObjectId; 
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth.js');

const authA = require('../middleware/authAppl.js');

//JSON web token to send encrypted data between frontend and backend
// contains header(algo and token type), payload(data), verify signature
// payload usually has our data, the iat(issued at time) and expiry time

//this secret will be used to create jwt

// Load Job model
const Job = require("../models/Job");
const Application = require("../models/Application")
const Applicant = require("../models/Applicant")

// route: appl/  
// PRIVATE
// GET request 
// Getting all the jobs
router.get("/", authA, async function(req, res) {
    var user_id=req.user.id;
    //console.log(user_id)
    var applications = [];
    var mess = '';
    await Application.find({appl_user_id: ObjectId(user_id)})
        .then(applicat => {
            applications= applicat;
            var filt = applicat.filter(a=>{ a.stage==='Applied' || a.stage==='Shortlisted'});
            var accepted = applicat.filter(a=>{a.stage==='Accepted'});
            if(filt.length===10){
                mess = "Sorry, you can't apply to more jobs as you reached application limit!"
            }
            if(accepted.length>0){
                mess = "You can't apply to more jobs as you have been accepted in a job already"
            }
        })
            console.log(applications)
    Job.find()
    	.populate('recr_id', 'email fname lname')
    	.then(jobs=> {
    		var filt = jobs.filter(job =>{
    			var d = job.deadline.split(" ");
    			var date = d[0].split("-");
    			var tim = d[1].split(":");
    			var dead = new Date(date[0],date[1]-1,date[2],tim[0],tim[1]);
    			// console.log((new Date()).getTime());
    			// console.log(dead.getTime())
    			return (((new Date()).getTime())<dead.getTime())
    		})
            var f=[];
            if(applications===[]){
                f = filt.map((j)=>{
                    return({...j._doc,applied:false});
                })
            }
            else{
                f = filt.map((j)=>{
                    console.log(j)
                    if(applications.some(applicati=>
                        applicati.job_id.toString()===j._id.toString())){
                        return({...j._doc,applied:true});
                    }
                    else{
                        return({...j._doc,applied:false});
                    }
                })
            }

            console.log(f)
			res.status(200).json({f,mess});
		})
    	.catch(err =>{
    		res.status(400).send(err);
    	});
    });

// route: appl/apply  
// PRIVATE
// POST request 
// Add a application to db
router.post("/apply", authA, async (req, res) => {
	const newApplication = new Application(req.body);
	const applId = req.user.id;
	await Applicant.findOne({user_id:applId})
		.then( appl =>{
                console.log("i")
			if(appl){
                console.log(appl)
				newApplication.appl_edu = appl.education;
				newApplication.appl_skills = appl.skills;
				newApplication.appl_rating = appl.rating;
				newApplication.appl_user_id = applId;
			}
			else{
                console.log("hi")
				return res.status(400).json({error: "Couldn't find applicant details"});
			}
		})

		.catch( err=>{
			return res.status(400).json({err, error: "Couldn't find applicant details"});
		});
	console.log(req.user);
    console.log(newApplication);
	const jobId = req.body.job_id;
	newApplication.save()
        .then(application => {
        	Job.findOneAndUpdate({_id:jobId}, {$inc : {'appl_got': 1}})
        		.then(j => {
        			res.status(200).json(application);
        		})
        		.catch(err=> {
		            return res.status(400).send(err);
		        });
            
        })
        .catch(err => {
            return res.status(400).send(err);
        });

    });

// route: appl/newProfile   
// PRIVATE
// POST request 
// Add a profile to db
router.post("/newProfile", authA, (req, res) => {
	const newProfile = new Applicant(req.body);
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

// route: appl/updateProfile   
// PRIVATE
// POST request 
// Update profile 
router.post("/updateProfile", authA, (req, res) => {
    const _id = req.user.id;
    const education = req.body.education;
    const skills = req.body.skills;
    const rating = req.body.rating;
    Applicant.updateOne({user_id: _id}, { $set: {education:education, skills:skills}})
        .then(savedPro => {

            res.status(200).json(savedPro);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: appl/profile   
// PRIVATE
// GET request 
// get profile info from db
router.get("/profile", authA, (req, res) => {
    var id = req.user.id;
    Applicant.findOne({user_id: id})
        .populate('user_id','email fname lname')
        .then(pro => {
            res.status(200).json(pro);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: appl/application  
// PRIVATE
// GET request 
// get application info from db
router.get("/applications", authA, (req, res) => {
    var id = req.user.id;
    Application.find({appl_user_id: id})
        .populate('recr_id','email fname lname')
        .populate('job_id','title salary')
        .then(a => {
            res.status(200).json(a);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

module.exports = router;
