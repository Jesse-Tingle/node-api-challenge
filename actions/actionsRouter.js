const express = require("express");

const router = express.Router();

const actions = require("../data/helpers/actionModel.js");

router.get("/", async (req, res) => {
	const actionsList = await actions.get();
	if (actionsList) {
		return res.status(200).json(actionsList);
	} else {
		return res
			.status(500)
			.json({ error: "The list of actions could not be retrieved." });
	}
});

router.get("/:id", (req, res) => {});

router.post("/:id", async (req, res) => {
	try {
		const {
			body,
			params: { id }
		} = req;

		const data = { ...body, project_id: id };
		const newAction = await actions.insert(data);
		res.status(201).json(newAction);
	} catch (error) {
		return res.status(500).json({ error: "The action could not be posted." });
	}
});

router.put("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const action = await actions.get(id);
		const { description, notes, completed } = req.body;
		const project_id = id;

		if (!action) {
			res.status(400).json({
				message: `The action with id ${req.params.id} does not exist.`
			});
		} else if (!description || !notes) {
			res.status(400).json({
				message: `Please provide project ID, description, and notes.`
			});
		} else {
			const newAction = { project_id, description, notes };
			await actions.update(id, newAction);
			const updatedAction = await actions.get(id);
			res.status(200).json(updatedAction);
		}
	} catch (error) {
		res.status(500).json({
			err,
			error: "The action information could not be modified."
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const action = await actions.get(id);
		if (!action) {
			res
				.status(400)
				.json({
					message: `The action with ID ${req.params.id} does not exist.`
				});
		}
		res.status(200).json(await actions.remove(req.params.id));
	} catch (error) {
		res.status(500).json({
			err,
			error: "The action could not be removed"
		});
	}
});

module.exports = router;
