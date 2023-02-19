const { mongo } = require('mongoose');
const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true
		},
		lastName: {
			type: String,
			required: true
		},
		email: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true
		},
		address: {
			type: String,
		},
		contact: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "inactive"],
			default: "inactive",
		}
	},
	{ timestamps: true }
);

userSchema.plugin(mongooseDelete, { overrideMethods: true })
const User = mongoose.model('user', userSchema);
module.exports = User;
