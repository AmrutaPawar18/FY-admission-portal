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

// Load Course model
const Course = require("../models/Course");
const Application = require("../models/Application")
const Applicant = require("../models/Applicant")

// route: appl/application  
// PRIVATE
// GET request 
// get application info from db
router.get("/applications", authA, async(req, res) => {
    var id = req.user.id;
    const applicant = await Applicant.findOne({user_id: id});
    await Application.find({appl_user_id: applicant._id})
        .then(a => {
            res.status(200).json(a);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: appl/apply  
// PRIVATE
// POST request 
// Add a application to db
router.post("/apply", authA, async (req, res) => {
	const appl_user_id = req.user.id;
	
    const newApplicant = new Applicant({ user_id: appl_user_id, ...req.body});
    console.log(req.body.course_title);
    const course = await Course.findOne({title: req.body.course_title});
    console.log(course)

    const course_id = course._id;

    const newApplication = new Application({
        course_id: course_id,
        course_title: req.body.course_title,
        appl_user_id: newApplicant._id,
        appl_edu: req.body.education
    })

	console.log(newApplicant);
    console.log(newApplication);
    newApplicant.save();
	newApplication.save();

    await Course.findOneAndUpdate({title:req.body.course_title}, {$inc : {'appl_received': 1}})
        .then(j => {
            console.log("j")
            res.status(200).send({ message: "Submitted Successfully" });
        })
        .catch(err=> {
            console.log(err)
            return res.status(400).send({ message: err.message });
        });
    });


// route: appl/  
// PRIVATE
// GET request 
// Getting all the Courses
// router.get("/", authA, async function(req, res) {
//     var user_id = req.user.id;
//     //console.log(user_id)
//     var mess = '';
//     const applications = await Application.find({appl_user_id: ObjectId(user_id)})
//         .then(applicat => {
//             var accepted = applicat.filter(a=> a.stage==='Accepted');
//             if(accepted.length>0){
//                 mess = "You can't apply to more Courses as you have been accepted in a Course already"
//             }
//         })
//     return applications;
// });


// route: appl/newProfile   
// PRIVATE
// POST request 
// Add a profile to db
// router.post("/newProfile", authA, (req, res) => {
// 	const newProfile = new Applicant(req.body);
// 	newProfile.user_id = req.user.id;
//     console.log(newProfile)
// 	console.log(req.user);
// 	newProfile.save()
//         .then(pro => {
//             res.status(200).json(pro);
//         })
//         .catch(err => {
//             x="";
//                     for(e in err.errors){
//                         x=x+err.errors[e].message+"\n";

//                     }
                    
//                     res.status(400).json({err, error:x});
//         });
//     });

// route: appl/updateProfile   
// PRIVATE
// PUT request 
// Update profile 
// router.put("/updateProfile", authA, (req, res) => {
//     const _id = req.user.id;
//     const education = req.body.education;
//     const address = req.body.address;
//     Applicant.findOneAndUpdate({user_id: _id}, {user_id: _id, education:education, address:address}, {new:true, upsert:true})
//         .then(savedPro => {
//             res.status(200).json(savedPro);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// route: appl/profile   
// PRIVATE
// GET request 
// get profile info from db
// router.get("/profile", authA, (req, res) => {
//     var id = req.user.id;
//     Applicant.findOne({user_id: id})
//         .populate('user_id','email fname lname')
//         .then(pro => {
//             res.status(200).json(pro);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// route: appl/rate/:id
// PRIVATE
// POST request 
// Save employee rating in db, update Course rating
// router.post("/rate/:id", authA, async function(req, res) {

//     var id = req.user.id;   //applicant id
//     console.log(id)
//     var aId= req.params.id; //application id
//     var rating= req.body.rating;
    
//     Application.findOneAndUpdate({_id: aId}, {$set:{Course_rating:rating}},{new:true})
//         .then(pro => {
//             Application.aggregate([
//                 {$match:{$and:[{Course_rating:{$gt:0}}, {Course_id:pro.Course_id}]}},
//                 {$group:{_id:"$Course_id", rate: {$avg: "$Course_rating"}}}
//             ])
//             .then(x=>{
//                 console.log(x)
//                 Course.findOneAndUpdate({_id:x[0]._id},{$set:{rating:x[0].rate}},{new:true})
//                     .then(p=>res.json(p))
//             })
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// router.post("/uploadPic")


module.exports = router;
