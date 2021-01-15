const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const educationSchema = new Schema({
    insti_name: {
        type: String,
        required: true
    },
    start_year: {
        type: String,
        required: true
    },
    end_year: {
        type: String,
    }
})
// Create Schema
const ApplicantSchema = new Schema({
    
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    education:{
        [educationSchema]
    },
    skills: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    }
});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);