const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Users'
	},
    contact: {
    	type: String,
    	required: true
    },
    bio: {
    	type: String,
    	maxLength: 250,
    	required: false//idk???
    }
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);