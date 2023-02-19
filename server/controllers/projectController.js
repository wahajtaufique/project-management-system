const Project = require("../models/project");
const moment = require('moment')

exports.addProject = async (req, res) => {
	try {
        const {projectName, description, image, tags } = req.body;

		const hasProject = await Project.findOne({ projectName });

		if (hasProject) {
			return res.status(200).json({
				message: "Project with this name already exists",
				status: false,
			});
		}

		const startDate = moment(req.body.startDate).toISOString();

		let keywords = [...projectName.split(" "), ...description.split(" "), ...tags].join(" ");

		const project = new Project({
			projectName, description, startDate, image, tags, keywords,
			...(req.body.repo && { repo: req.body.repo }),
			...(req.body.live && { live: req.body.live }),
		});

		await project.save();

		const result = await Project.findById(project._id);
		
		return res.status(200).json({
			message: "Project added successfully",
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

exports.getProjects = async (req, res) => {
	try {

		let { sort, keyword, filter } = req.query;

		let query = {};
		
		if (filter == "completed") {
			query["status"] = "completed";
		}

		if (filter == "in-progress") {
			query["status"] = "in-progress";
		}

		if (filter == "archived") {
			query["archived"] = true
		}

		if (sort) {
			sort === 'asc' ? sort = 1 : sort = -1;
		}

		if (keyword) {
			keyword = keyword.replace(/-/g, " ");
		}

		const projects = await Project.find({ 
			...(keyword && { keywords: { $regex: keyword, $options: "i" } }),
			...query
		}).sort({ projectName: sort });

		if (projects.length === 0) {
			return res.status(200).json({
				message: "No projects found!",
				status: true,
				projects: []
			});
		} 
	
		return res.status(200).json({
			message: "Projects fetched successfully",
			projects,
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

exports.updateProject = async (req, res) => {
	try {
		const { id, status } = req.body;

		const updateProject = await Project.findOneAndUpdate(
			{
				_id: id,
			},
			{
				$set: {
					...(status == "completed" && { status: "completed"}),
					...(status == "archived" && { status: "completed", archived: true})
				}
			}
		);
		return res.status(200).json({
			message: "Project updated successfully!",
			status: true
		});
	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
}

exports.getStats = async (req, res) => {
	try {
		const completed = await Project.find({
			status: "completed"
		}).countDocuments();

		const inProgress = await Project.find({
			status: "in-progress"
		}).countDocuments();

		const archived = await Project.find({
			archived: true
		}).countDocuments();
	
		return res.status(200).json({
			message: "Projects stats fetched successfully",
			status: true,
			stats: { inProgress, archived, completed, total: inProgress + archived + completed }
		});

	} catch (error) {
		return res.status(500).json({
			message: "Something went wrong!",
			status: false,
			error: error,
		});
	}
};