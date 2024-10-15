const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dept = [
	'Computer Engineering & Information Technology', 'Electrical & Electronics',
	'Mechanical & Production', 'Civil', 'Textile'
  ]

// Create Schema
const CourseSchema = new Schema({
	title: {
		type: String,
		required: true
	},
    dept: {
    	type: String,
    	required: true,
        enum: dept
    },
    capacity: {
    	type: Number,
    	required: true
    },
    batch: {
    	type: Number,
    	required: true
    },
    appl_received:{      //updated when applicant submits application
        type: Number,   
        default: 0
    },
    seats_filled:{   //updated when admin accepts application
        type:Number,
        default:0
    }
});

module.exports = Course = mongoose.model("Courses", CourseSchema);