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

router.get("/", (req, res) => {});

router.post("/", (req, res) => {});

router.put("/", (req, res) => {});

router.delete("/", (req, res) => {});

module.exports = router;
