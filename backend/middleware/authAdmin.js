const jwt = require('jsonwebtoken');
const secret = require('../config/keys').secret;

function authAppl(req, res, next){
	const tok = req.header('auth-tok');

	//check for token
	if(!tok){
		return res.status(401).json({error:"No token, authorization denied "});

	}

	try{
		//verify token
		const decode = jwt.verify(tok, secret);
		if(decode.role!=="Admin"){
			throw Error("Not authorized to access this page")	
		}
		else{
		//add user from payload of jwt 
		//so that whenever token is sent, we have user details in the request value
		req.user = decode;
		next(); // go to the next middleware
		}
	}
	catch(e){
		if(e.message==="Not authorized to access this page"){
			res.status(403).json({error:"Not authorized to access this page"});
		}
		else
		res.status(401).json({error:"Invalid token"});
	}
}

module.exports = authAppl;