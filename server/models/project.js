const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
	{
		projectName: {
			type: String,
			required: true
		},
		description: {
			type: String,
			required: true
		},
		startDate: {
			type: Date,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Types.ObjectId,
			ref: "user",
			required: true
		},
		repo: {
			type: String,
		},
		live: {
			type: String,
		},
		tags: {
			type: [String],
			required: true
		},
		keywords: {
			type: String,
			required: true,
		},
		archived: {
			type: Boolean,
			default: false
		},
		status: {
			type: String,
			enum: ["completed", "in-progress"],
			default: "in-progress",
		}
	},
	{ timestamps: true }
);

projectSchema.plugin(mongooseDelete, { overrideMethods: true })
const Project = mongoose.model('project', projectSchema);
module.exports = Project;
