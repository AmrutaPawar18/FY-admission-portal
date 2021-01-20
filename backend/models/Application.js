const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stages = ['Applied', 'Shortlisted', 'Accepted', 'Rejected','Job deleted'];

// Create Schema
const ApplicationSchema = new Schema({
	job_id: {
		type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Jobs'
	},
    recr_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Users'
    },
    doj:{
        type:Date,
    },
    appl_user_id: {
    	type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Users'
    },
    date_of_appl:{
        type:Date,
        required: true,
        default: Date.now
    },
    appl_rating:{
        type: Number,
        min: 0,
        max: 5,
    },
    appl_edu: {
        type : Array,
    },
    appl_skills:{
        type : Array,
    },
    stage:{
        type: String,
        enum: stages,
        default: 'Applied',
        required: true
    },
    sop: {
    	type: String,
    	required: true
    }
});

module.exports = Recruiter = mongoose.model("Applications", ApplicationSchema);