// libraries
const express = require("express");
const helmet = require("helmet");

// global objects
const server = express();

// imports
const logger = require("./middleware/logger.js");
const projectsRouter = require("./projects/projectsRouter.js");

// middleware
server.use(logger);
server.use(helmet());
server.use(express.json());

// routes
server.use("/api/projects", projectsRouter);

server.get("/", (req, res) => {
	res.send(`<h2>Node Web API Sprint Challenge!</h2>`);
});

module.exports = server;
