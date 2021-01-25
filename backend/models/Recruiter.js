const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const RecruiterSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Users',
        unique: true
	},
    contact: {
    	type: String,
    	required: true
    },
    bio: {
    	type: String,
    }
});

module.exports = Recruiter = mongoose.model("Recruiters", RecruiterSchema);