var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const nodemailer = require('nodemailer'); 
  
  
const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
        user: 'VJTIlibrary@outlook.com',
        pass: 'vjtiLib2023'
    }
});

const auth = require('../middleware/auth.js');

const authR = require('../middleware/authAdmin.js');

//JSON web token to send encrypted data between frontend and backend
// contains header(algo and token type), payload(data), verify signature
// payload usually has our data, the iat(issued at time) and expiry time

const secret = require('../config/keys.js').secret;
//this secret will be used to create jwt

// Load models
const Course = require("../models/Course");
const Admin = require("../models/Admin");
const Application = require("../models/Application.js");
const Applicant = require("../models/Applicant.js");
const User = require('../models/User.js')

// GET request 
// Getting all active Courses (Courses with max positions not filled(capacity>seats_filled))
router.get("/courses", authR, async function(req, res) {
    await Course.find()//, $expr:{$gt:["$maxPos","$posn_filled"]}})
        .then(Courses => {
		  res.json(Courses);
	})
});

router.get("/applications", authR, async (req, res) => {
    await Application.find({})
        .then(a => {
            res.json(a);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

router.put("/updateStatus", authR, async (req, res) => {
    console.log("Route hit!")
    console.log(req.body)
    var appl_id = req.body.id;
    var stage = req.body.stage;
    console.log(stage);
    // if (stage == "DocumentsVerified")
    // {
    //     stage = "Documents Verified";
    // }
    // else if (stage == "FeesPaid")
    // {
    //     stage = "Fees Paid";
    // }
    const application = await Application.findById(appl_id);
    console.log(application);
    await Application.findByIdAndUpdate(appl_id, {$set:{stage:stage}})
        .then(appl => {
           res.status(200).json(appl);
        })

        .catch(err => {
            return res.status(400).send(err);
        }) 
})

// route: admin/accept
// PRIVATE
// POST request 
// Accept an applicant, 
// reject all other applications of that applicant, 
//incr posn_filled of Course
//(if now all positions have been filled then reject all applications for this Course)
router.put("/accept", authR, async function(req, res) {
    var id = req.body.id;
    const application = await Application.findById(id).populate('appl_user_id');
    const user_id = application.appl_user_id.user_id;
    var user = await User.findById(user_id);
    var email = user.email;
    console.log(email)
    const course_id = application.course_id;
    try {
        const appl = await Application.findByIdAndUpdate(id, { $set: { stage: "Accepted" } });
    
        if (!appl) {
            return res.status(404).json({ message: "Application not found" });
        }
    
        const course = await Course.findByIdAndUpdate(course_id, { $inc: { 'seats_filled': 1 } }, { new: true });
    
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
    
        if (course.seats_filled < course.capacity) {
            res.status(200).json({ message: "Updated", application: appl, course });
        } else {
            res.status(400).json({ message: "Course capacity exceeded" });
        }
    
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
    

    let mailDetails = { 
        from: "VJTIlibrary@outlook.com", 
        to: email, 
        subject: 'Congratulations!', 
        text: `You have been accepted into Veermata Jijabai Technological Institute`
    }; 

    transporter.sendMail(mailDetails, function(err, data) { 
        if(err) { 
            console.log(err); 
        } else { 
            console.log('Email sent successfully'); 
        } 
    }); 

    //reject all applications, return a message for Admin
    // if(c==0){
    //     Application.updateMany({Course_id:CourseId, stage:{$ne:"Accepted"}},{$set: {stage: "Rejected"}},(err,result)=>{
    //         if(err)
    //             return res.status(400).send(err)
    //         else res.status(200).json({mess:"All positions for this Course have been filled!"})
    //     })
    // }
});

// route: admin/newCourse    
// PRIVATE
// POST request 
// Add a Course to db
// router.post("/newCourse", authR, (req, res) => {
// 	const newCourse = new Course(req.body);
// 	console.log(req.user);
// 	newCourse.save()
//         .then(Course => {
//             res.status(200).json(Course);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// route: admin/updateCourse  
// PRIVATE
// POST request 
// Update Course details 
// router.post("/updateCourse", authR, (req, res) => {
//     const _id = req.user.id;
//     const maxAppl = req.body.maxAppl;
//     const maxPos = req.body.maxPos;
//     const CourseId = req.body.id;
//     const deadline = req.body.deadline;
//     Course.updateOne({_id: CourseId}, { 
//         $set: {
//             maxPos:maxPos, 
//             maxAppl:maxAppl, 
//             deadline:deadline}})
//         .then(savedCourse => {

//             res.status(200).json(savedCourse);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });
// 
// route: admin/deleteCourse  
// PRIVATE
// DELETE request 
// Delete Course
// router.delete("/deleteCourse/:id", authR, async (req, res) => {
//     const _id = req.user.id;
//     const CourseId = req.params.id;
//     await Course.deleteOne({_id: CourseId})
//         .then(out => {

//         //    res.status(200).json(out);
//         })
//         .catch(err => {
//             return res.status(400).send(err);
//         });

//     // update stage of all applications with this Course id
//     Application.updateMany({Course_id:CourseId},{$set: {stage: "Course deleted"}},(err,result)=>{
//         if(err)
//             res.status(400).send(err)
//         else res.status(200).json({mess:"Deleted"})
//     })

//     });


// route: admin/updateProfile   
// PRIVATE
// PUT request 
// Update profile 
// router.put("/updateProfile", authR, (req, res) => {
//     const _id = req.user.id;
//     const contact = req.body.contact;
//     const bio = req.body.bio;
//     Admin.updateOne({user_id: _id}, {user_id:_id,contact:contact, bio:bio},{new:true,upsert:true})
//         .then(savedPro => {

//             res.status(200).json(savedPro);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });


// route: admin/profile
// PRIVATE
// GET request 
// Get Admin profile details from db
// router.get("/profile", authR, function(req, res) {

//     var id = req.user.id;
//     Admin.findOne({user_id: id})
//         .populate('user_id','email fname lname')
//         .then(pro => {
//             res.status(200).json(pro);
            

//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// route: admin/newProfile   
// PRIVATE
// POST request 
// Add a profile to db
// router.post("/newProfile", authR, (req, res) => {
// 	const newProfile = new Admin(req.body);
// 	newProfile.user_id = req.user.id;
// 	console.log(req.user);
// 	newProfile.save()
//         .then(pro => {
//             res.status(200).json(pro);
//         })
//         .catch(err => {
//             x="";
//             for(e in err.errors){
//                 x=x+err.errors[e].message+"\n";

//             }
            
//             res.status(400).json({err, error:x});
//         });
//     });

// route: admin/applications
// PRIVATE
// POST request 
// Get non-rejected applications for a Course from db
// router.post("/applications", authR, function(req, res) {

//     var id = req.user.id;
//     var courseId = req.body.id
//     Application.find({course_id: courseId, stage:{$ne: "Rejected"}})
//         .populate('appl_user_id','fname lname email')
//         .then(appls => {
//             res.status(200).json(appls);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });


// route: admin/shortlist
// PRIVATE
// POST request 
// Shortlist an applicant
// router.post("/shortlist", authR, function(req, res) {

//     var id = req.user.id;
//     console.log(req.user);
//     console.log("hi")
//     var applicationId = req.body.id;
//     Application.findOneAndUpdate({_id: applicationId}, {$set:{stage:"Shortlisted"}},{new:true})
//         .populate('appl_user_id','fname lname')
//         .then(appl => {
//             res.status(200).json(appl);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// route: admin/employees
// PRIVATE
// GET request 
// Get employee details from db
// router.get("/employees", authR, function(req, res) {

//     var id = req.user.id;
//     Application.find({stage:"Accepted"})
//         .populate('appl_user_id','fname lname')
//         .then(pro => {
//             res.status(200).json(pro);
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// route: admin/rate/:id
// PRIVATE
// POST request 
// Save employee rating in db
// router.post("/rate/:id", authR, async function(req, res) {

//     var id = req.user.id;   //Admin id
//     console.log(id)
//     var aId= req.params.id; //application id
//     var rating= req.body.rating;
    
//     Application.findOneAndUpdate({_id: aId}, {$set:{appl_rating:rating}},{new:true})
//         .then(pro => {
//             Application.aggregate([
//                 {$match:{$and:[{appl_rating:{$gt:0}}, {appl_user_id:pro.appl_user_id}]}},
//                 {$group:{_id:"$appl_user_id", rate: {$avg: "$appl_rating"}}}
//             ])
//             .then(x=>{
//                 console.log(x)
//                 // console.log(pro.appl_user_id)
//                 // console.log(typeof pro.appl_user_id);
//                 // console.log(x[0]._id);
//                 // console.log(x[0]._id===pro.appl_user_id)
//                 // var y= x.filter(e => e._id===pro.appl_user_id)
//                 // console.log(y)
//                 Applicant.findOneAndUpdate({user_id:x[0]._id},{$set:{rating:x[0].rate}},{new:true})
//                     .then(p=>res.json(p))
//             })
//         })
//         .catch(err => {
//             res.status(400).send(err);
//         });
//     });

// router.put("/check", function(req,res){
//     var id=req.body.id
//     Application.aggregate([
//         {$match:{appl_rating:{$gt:0}}},
//         {$group:{_id:"$appl_user_id", rate: {$avg: "$appl_rating"}}}
//     ]).then(x=>{
//         var y= x.filter(e=>e._id==id)
//         Applicant.findOneAndUpdate({user_id:id},{$set:{rating:y[0].rate}})
//     .then(p=>res.json(p))})
// })



module.exports = router;
