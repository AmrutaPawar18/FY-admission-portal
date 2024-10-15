const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stages = ['Submitted', 'Under Review', 'Approved', 'Documents Verified', 'Fees Paid', 'Accepted', 'Rejected'];

// Create Schema
const ApplicationSchema = new Schema({
	course_id: {
		type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Courses'
	},
    course_title:{
        type:String,
        required:true,
    },
    appl_user_id: {
    	type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Applicants'
    },
    date_of_appl:{
        type:Date,
        required: true,
        default: Date.now
    },
    appl_edu: {
        type : Array,
    },
    stage:{
        type: String,
        enum: stages,
        default: 'Submitted',
        required: true
    }
});

module.exports = Application = mongoose.model("Applications", ApplicationSchema);