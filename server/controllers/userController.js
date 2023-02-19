const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.registerUser = async (req, res) => {
	try {
        const {email, firstName, lastName, address, contact, password } = req.body;
		const hasUser = await User.findOne({ email });
		const deletedUser = await User.findOneDeleted({ email });
		if (hasUser || deletedUser) {
			return res.status(200).json({
				message: "Email already exists",
				status: false,
			});
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		const user = new User({
			firstName, lastName, address, contact,
			email,
			password: hashedPassword,
			status: "active",
		});

		await user.save();
		const result = await User.findById(user._id).select("-password");
		return res.status(200).json({
			message: "User created successfully",
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

exports.userLogin = async (req, res) => {
	try {
		let user = await User.findOne({ email: req.body.email });

		if (!user) {
			return res.status(200).json({
				message: "Email not found!",
				status: false,
			});
		} 

		const result = await bcrypt.compare(req.body.password, user.password);
		
		if (!result) {
			return res.status(200).json({
				message: "Email and password may be incorrect!",
				status: false,
			});
		}

		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
				id: user._id,
			},
			process.env.JWTSECRETKEY,
			{
				expiresIn: "3d",
			}
		);

		user = {...user._doc, password: undefined}
	
		return res.status(200).json({
			message: "Login successfully",
			token,
			user: user,
			status: true,
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
};

