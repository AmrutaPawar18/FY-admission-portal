const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stages = ['Applied', 'Shortlisted', 'Accepted', 'Rejected'];

// Create Schema
const ApplicationSchema = new Schema({
	job_id: {
		type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Jobs'
	},
    appl_email: {
    	type: String,
    	required: true,
        match: '/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'
    },
    appl_name: {
        type: String,
        required: true
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
    	maxLength: 250,
    	required: true
    }
});

module.exports = Recruiter = mongoose.model("Applications", ApplicationSchema);