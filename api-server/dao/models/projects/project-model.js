const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
	project_id:{
		type: String,
		unique: true,
		required: [true, "project_id is of type string and is required"]
	},
	project_name: {
		type: String,
		trim: true,
		required: [true, "project_name is of type string and is required"]
	},
	project_owner: {
		type: String,
		trim: true,
		lowercase: true,
		required: [true, "project_owner is of type string and is required"]
	},
	project_members: {
		type: [String],
		trim: true,
		lowercase: true
	},
	excluded_event_types: {
		type: [String],
		trim: true
	},
	origins: {
		type: [String],
		trim: true,
		lowercase: true
	},
	created_on: {
		type: Date,
		default: Date.now
	},
	archived: {
		type: Boolean,
		default: false
	}
}, { id: false });

const Project = mongoose.model('Project', projectSchema ); 

export default Project;