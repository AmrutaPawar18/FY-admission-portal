var express = require("express");
var router = express.Router();
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth.js');

//JSON web token to send encrypted data between frontend and backend
// contains header(algo and token type), payload(data), verify signature
// payload usually has our data, the iat(issued at time) and expiry time

const secret = require('../config/keys').secret;
//this secret will be used to create jwt

// Load User model
const User = require("../models/User");



// route: user/ 
// PUBLIC
// GET request 
router.get("/", auth, function(req, res) {
    console.log(req.user);
    const id = req.user.id;
    User.findById(id).then(user=> {
        if (user) {
            res.status(200).json({check:true, role:req.user.role})
        } else {
            res.status(200).json({check:false});
        }
        })
        .catch(err=>{res.status(400).send(err)});
    
});

// route: user/updateDetails  
// PRIVATE
// PATCH request 
// Update profile 
router.patch("/updateDetails", auth, (req, res)=> {
    const fname= (req.body.fname);
    const lname = req.body.lname;
    const user_id = req.user.id;
    console.log(req.user);
    User.updateOne({_id:user_id}, {$set: {fname,lname}})
        .then(savedPro => {

            res.status(200).json(savedPro);
        })
        .catch(err => {
            res.status(400).send(err);
        });
    });

// route: user/register    
// PUBLIC
// POST request 
// Add a user to db
router.post("/register", (req, res) => {
    if (req.body.role == "Admin")
    {
        const vjtiEmailRegex = /^[a-zA-Z0-9._%+-]+@vjti\.ac\.in$/;
        if (!vjtiEmailRegex.test(req.body.email))
        {
            return res.status(401).json({error: "Please enter your VJTI email id"});
        }
    }
    const newUser = new User(req.body);
    const email = req.body.email;
    console.log(newUser);
    User.findOne({email}).then(user =>{
        if(user){
            return res.status(400).json({
                error: "Account with this email address already exists"
            });
        }
    })

    // hash the password by creating salt and 
    bcrypt.genSalt(10, (err,salt) => {  //number of rounds, 10 is default, higher is more secure but also takes more time
        
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            console.log(newUser);
            newUser.save()
                .then(user => {
                    jwt.sign(
                        {id:user.id, role:user.role,name: user.fname+" "+user.lname},
                        secret,
                        (err, token) =>{
                            if(err) throw err;
                            res.status(200).json({
                                token,
                        
                                id: user.id,
                                name: user.fname+" "+user.lname,
                                role: user.role,
                            
                            });
                        })
                    
                })
                .catch(err => {
                    x="";
                    for(e in err.errors){
                        x=x+err.errors[e].message+"\n";

                    }
                    
                    res.status(400).json({err, error:x});
                });

        })
    })
        
});

// route: user/login   
// PUBLIC
// POST request 
// Authenticate user
router.post("/login", (req, res) => {
	const email = req.body.email;
    const pwd = req.body.password;
    if(!email || !pwd){
        return res.status(404).json({
            error:"Please enter all fields",
        });
    }
	// Find user by email
	User.findOne({ email }).then(user => {
		// Check if user email exists
		if (!user) {
			return res.status(404).json({
				error: "Email not found",
			});
        }

        //validate user
        bcrypt.compare(pwd, user.password)
            .then(isMatch => {
                if(!isMatch) 
                    return res.status(404).json({
                        error: "Invalid credentials"
                    });

                //matched, send jwt to frontend
                jwt.sign(
                    {id:user.id, role:user.role,name: user.fname+" "+user.lname},
                    secret,
                    {expiresIn: 25200 },
                    (err, token) =>{
                        if(err) throw err;
                        res.status(200).json({
                            token,
                            id: user.id,
                            name: user.fname+" "+user.lname,
                            role: user.role,  
                        });
                    })
            })
	});
});

module.exports = router;

