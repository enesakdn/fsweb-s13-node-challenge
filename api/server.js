const express = require("express");
const server = express();
const ProjectsRouter = require("./projects/projects-router");
const ActionsRouter = require("./actions/actions-router");

// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

server.use(express.json());

server.use("/api/projects", ProjectsRouter);
server.use("/api/actions", ActionsRouter);
module.exports = server;
