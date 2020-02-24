const express = require("express");

const router = express.Router();

const actions = require("../data/helpers/actionModel.js");
const projects = require("../data/helpers/projectModel.js");

router.get("/", async (req, res) => {
	const projectsList = await projects.get();
	if (projectsList) {
		return res.status(200).json(projectsList);
	} else {
		return res
			.status(500)
			.json({ error: "The list of projects could not be retrieved." });
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const projectList = await projects.get(id);
	if (projectList) {
		return res.status(200).json(projectList);
	} else {
		return res.status(500).json({
			error: `The project with id ${req.params.id} could not be retrieved.`
		});
	}
});

router.post("/", async (req, res) => {
	try {
		const { name, description, completed } = req.body;
		console.log("name: ", name);
		console.log("description: ", description);
		console.log("completed: ", completed);
		res
			.status(201)
			.json(await projects.insert({ name, description, completed }));
	} catch (error) {
		res.status(500).json({
			error,
			errorMessage:
				"There was an error while saving the project to the database"
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const project = await projects.get(id);
		const { name, description, completed } = req.body;
		console.log("name: ", name);
		console.log("description: ", description);
		console.log("completed: ", completed);

		if (project.length < 1) {
			res.status(400).json({
				message: `The project with id ${req.params.id} does not exist.`
			});
		} else if (!name || !description) {
			res.status(400).json({
				message: `Please provide a name, description, and completed status.`
			});
		} else {
			const newProject = { name, description, completed };
			await projects.update(id, newProject);
			const updatedProject = await projects.get(id);
			res.status(200).json(updatedProject);
		}
	} catch (err) {
		res.status(500).json({
			err,
			error: "The project information could not be modified."
		});
	}
});

router.delete("/:id", (req, res) => {});

module.exports = router;
