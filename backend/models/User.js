const mongoose = require('mongoose');
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'

const roles = [
  'Recruiter', 'Applicant'
]

const userSchema = new mongoose.Schema({
    email: {
        type:String,
        unique: [true, "This email is already used!"],
        required: [true, "Email field is required!"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email address']
    },
    password: {
        type: String,
        required: [true, "Password field is required!"]
    },
    fname: {
        type: String,
        required: [true, "First name field is required!"]
    },
    lname: {
        type: String,
        required: [true, "Last name field is required!"]
    },
    role: {
        type: String,
        required: [true, "Please select a role!"],
        enum: roles
    },
    date_of_reg: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('Users', userSchema)
