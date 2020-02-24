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

router.get("/:id", (req, res) => {});

router.post("/", async (req, res) => {
	try {
		const { name, description, completed } = req.body;
		console.log("name: ", name);
		console.log("description: ", description);
		console.log("completed: ", completed);
		res.status(201).json(await userDb.insert({ name, description, completed }));
	} catch (error) {
		res.status(500).json({
			error,
			errorMessage:
				"There was an error while saving the project to the database"
		});
	}
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

function validateId() {}
module.exports = router;
