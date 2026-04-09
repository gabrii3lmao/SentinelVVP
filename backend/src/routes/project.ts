import express from "express";
import { ProjectsController } from "../controller/projects.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const projectRoutes = express.Router();

projectRoutes.get("/", authMiddleware, ProjectsController.getProjects);
projectRoutes.post("/", authMiddleware, ProjectsController.createProject);
projectRoutes.delete("/:id", authMiddleware, ProjectsController.deleteProject);
projectRoutes.put("/:id", authMiddleware, ProjectsController.updateProject);

export default projectRoutes;
