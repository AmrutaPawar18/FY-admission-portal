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
    },
    percentage: {
        type: Number,
        required: true
    }
})
// Create Schema
const ApplicantSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Users'
    },
    mName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    education: {
        type:Array,
        required: true
    },
    merit_no: {
        type: Number,
        required: true
    },
    ssc_cert_path: {
      type: String,
    },
    ssc_cert_mimetype: {
      type: String,
    },
    hsc_cert_path: {
    type: String,
    },
    hsc_cert_mimetype: {
    type: String,
    }
});

module.exports = Applicant = mongoose.model("Applicants", ApplicantSchema);