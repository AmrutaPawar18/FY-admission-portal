const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stages = ['Applied', 'Shortlisted', 'Accepted', 'Rejected','Job deleted'];
const jobType = [
  'Full-time', 'Part-time', 'Work from Home'
]

// Create Schema
const ApplicationSchema = new Schema({
	job_id: {
		type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Jobs'
	},
    job_title:{
        type:String,
        required:true,
    },
    job_salary:{
        type:Number,
        required:true,
    },
    job_type:{
        type: String,
        required: true,
        enum: jobType
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
    appl_id: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Applicants'
    },
    date_of_appl:{
        type:Date,
        required: true,
        default: Date.now
    },
    appl_rating:{ //given by recruiter if accepted
        type: Number,
        min: 0,
        max: 5,
    },
    job_rating:{    // given by applicant to the job if accepted
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