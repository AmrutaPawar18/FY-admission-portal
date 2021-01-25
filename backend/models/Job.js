const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobType = [
  'Full-time', 'Part-time', 'Work from Home'
]

// Create Schema
const JobSchema = new Schema({
	title: {
		type: String,
		required: true
	},
	recr_id: {
		type: Schema.Types.ObjectId,
		required: true,
        ref: 'Users'
	},
    salary: {
    	type: Number,
    	required: true
    },
    maxAppl: {
    	type: Number,
    	required: true
    },
    maxPos: {
    	type: Number,
    	required: true
    },
    deadline: {
    	type: String,
    	required: true
    },
    skills: {
    	type: Array,
    	required: true
    },
    type: {
    	type: String,
    	required: true,
        enum: jobType
    },
    duration: {
    	type: Number,
    	required: true
    },
    rating: {
    	type: Number,
    	min: 0,
    	max: 5,
    },
	date_of_post:{
		type: Date,
		required: true,
		default: Date.now
	},
    appl_got:{      //updated when applicant submits application
        type: Number,   
        default: 0
    },
    posn_filled:{   //updated when recruiter accepts application
        type:Number,
        default:0
    }
});

module.exports = Job = mongoose.model("Jobs", JobSchema);