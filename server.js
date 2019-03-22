const express = require("express");

const projectsRouter = require("./routers/projects-router.js");
const actionsRouter = require("./routers/actions-router.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.send(
    `Navigate to /api/project on the URL to get all projects \n Navigate to /api/actions to get all actions.`
  );
});

server.use("/api/projects", projectsRouter);

server.use("/api/actions", actionsRouter);

module.exports = server;
