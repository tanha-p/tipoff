const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	user_id:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
		required: [true, "user_id is of type string and is required"]
	},
	name: {
		type: String,
		required: [true, "name is of type string and is required"]
	},
	password: {
		type: String,
		required: [true, "password is of type string and is required"]
	},
	created_on: {
		type: Date,
		default: Date.now
	}
}, { id: false });

/**
 * Mongoose automatically looks for plural,lowercased version. The model below
 * is for the "tips" collection 
 */
const User = mongoose.model('User', userSchema ); 

export default User; 