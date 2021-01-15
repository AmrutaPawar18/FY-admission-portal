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
		required: true
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
    	type: [String],
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
    	required: false//idk????
    },
	date_of_post:{
		type: Date,
		required: true,
		default: Date.now
	},
});

module.exports = Job = mongoose.model("Jobs", JobSchema);