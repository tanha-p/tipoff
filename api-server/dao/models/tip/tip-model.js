const mongoose = require("mongoose");

const tipSchema = new mongoose.Schema({
	tip_id:{
		type: String,
		required: [true, "tip_id is of type string and is required"]
	},
	project_id: {
		type: String,
		required: [true, "project_id is of type string and is required"]
	},
	event_type: {
		type: String,
		trim: true,
		required: [true, "event_type is of type string and is required"]
	},
	event_title: {
		type: String,
		trim: true,
		required: [true, "event_title is of type string and is required"]
	},
	event_stack: {
		type: Object
	},
	created_on: {
		type: Date,
		default: Date.now
	},
	tags: {
		type: [String]
	},
	note: {
		type: String
	},
	referer: {
		type: String
	},
	user: {
		type: Object
	},
	user_agent: {
		type: Object
	},
	notifiers: {
		type: [String]
	},
	screenshot: {
		type: String
	}
}, { id: false });

/**
 * Mongoose automatically looks for plural,lowercased version. The model below
 * is for the "tips" collection 
 */
const Tip = mongoose.model('Tip', tipSchema ); 

export default Tip;