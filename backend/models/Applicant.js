const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    insti_name: {
        type: String,
        required: true
    },
    start_year: {
        type: Number,
        required: true
    },
    end_year: {
        type: Number,
        default:null
    }
})
// Create Schema
const ApplicantSchema = new Schema({
    
    user_id: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Users'
    },
    education: {
        type:Array,
        required: true
    },
    skills: {
        type: Array,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    pic_path: {
      type: String,
    },
    pic_mimetype: {
      type: String,
    },
    cv_path: {
      type: String,
    },
    cv_mimetype: {
      type: String,
    }
});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);