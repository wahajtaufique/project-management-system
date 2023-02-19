const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Role = require("../models/role");
const Permission = require("../models/permission");
const mongoose = require("mongoose");
const logger = require('../config/logger')


exports.addRole = async (req, res) => {
	try {
        const { name } = req.body;
		const hasRole = await Role.findOne({ name });

		if (hasRole) {
			return res.status(200).json({
				message: "Role already exists",
				status: false,
			});
		}

		let pattern = /super/i;
		if (pattern.test(name)) {
			return res.status(200).json({
				message: "Role name cannot include Super",
				status: false,
			});
		}

		// if (req.body.permissions?.length === 0 && name !== "superAdmin") {
		// 	return res.status(200).json({
		// 		message: "No permissions are defined",
		// 		status: false,
		// 	});
		// }

		const role = new Role({name, ...(req.body.permissions?.length > 0 
										&& {permissions: req.body.permissions})});

		await role.save();
		const result = await Role.findById(role._id)
		return res.status(200).json({
			message: "Role created successfully",
			status: true,
			result,
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
};

exports.editRoles = async (req, res) => {
	try {
		const { roles } = req.body
		for (let role of roles ) {
			let permissions = await Permission.aggregate([
				{
					$match: {
						name: { $in: role.permissions}
					}
				},
				{
					$group: {
						_id: null,
						ids: {
							$addToSet: "$_id"
						}
					}
				}

			]);
			if (permissions[0]?.ids) {
				await Role.updateOne({name: role.role}, {
					$set: {
						permissions: permissions[0].ids
					}
				})
			}
		}
		
		return res.status(200).json({
			message: "Changes saved successfully",
			status: true,
		});
	} catch (error) {
		res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
}

exports.getOneRole = async (req, res) => {
	try {
		const role = await Role.find({_id: req.params.id});
		if (role.length === 0) {
			return res.status(200).json({
				message: "No role found",
				status: false,
			});
		}
		return res.status(200).json({
			message: "Role fetched successfully",
			status: true,
			role
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
}

exports.getAllRoles = async (req, res) => {
	try {
		const roles = await Role.find().populate({path: "permissions", select: "name"});
		if (roles.length === 0) {
			return res.status(200).json({
				message: "No roles are found",
				status: false,
			});
		}
		return res.status(200).json({
			message: "Roles fetched successfully",
			status: true,
			roles
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
}

exports.deleteRole = async (req, res) => {
	try {
		const id = req.params.id;
		const role = await Role.find({ _id: id });
		if (role.length < 1) {
			return res.status(200).json({
				message: "Role not found!",
				status: false,
			});
		}
		let result = await Role.delete({ _id: id });
		return res.status(200).json({
			message: "Role deleted successfully",
			status: true
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
};

