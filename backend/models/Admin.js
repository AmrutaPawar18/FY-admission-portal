const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AdminSchema = new Schema({
	user_id: {
		type: Schema.Types.ObjectId,
        required: true, 
        ref: 'Users',
        unique: true
	},
    contact: {
    	type: String,
    	required: true,
        match: [/^\d{10}$/, 'Invalid contact number']
    },
    bio: {
    	type: String,
    }
});

module.exports = Admin = mongoose.model("Admins", AdminSchema);