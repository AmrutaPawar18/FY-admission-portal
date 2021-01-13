const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;

function auth(req, res, next){
	const tok = req.header('auth-tok');

	//check for token
	if(!tok){
		res.status(401).json({error:"No token, authorization denied "});

	}

	try{
		//verify token
		const decode = jwt.verify(tok, secret);

		//add user from payload of jwt 
		//so that whenever token is sent, we have user details in the request value
		req.user = decode;
		next(); // go to the next middleware
	}
	catch(e){
		res.status(400).json({error:"Invalid token"});
	}
}

module.exports = auth;