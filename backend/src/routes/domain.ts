import express from "express";
import { DomainController } from "../controller/domain.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const domainRoutes = express.Router();

domainRoutes.get("/", authMiddleware, DomainController.getDomains);
domainRoutes.get("/:id/logs", authMiddleware, DomainController.getLogs);
domainRoutes.post("/", authMiddleware, DomainController.createDomain);
domainRoutes.delete("/:id", authMiddleware, DomainController.deleteDomain);
domainRoutes.put("/:id", authMiddleware, DomainController.updateDomain);

export default domainRoutes;
