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

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

module.exports = router;
