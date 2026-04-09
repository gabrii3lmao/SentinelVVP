import express from "express";
import authRoutes from "./auth.js";
import domainRoute from "./domain.js";
import projectRoutes from "./project.js";
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/projects", projectRoutes);
router.use("/projects/:projectId/domains", domainRoute);

export default router;
