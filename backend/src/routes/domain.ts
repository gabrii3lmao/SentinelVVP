import express from "express";
import { DomainController } from "../controller/domain.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const domainRoutes = express.Router({ mergeParams: true });

domainRoutes.use(authMiddleware);

domainRoutes.get("/", DomainController.getDomains);
domainRoutes.get("/:id/logs", DomainController.getLogs);
domainRoutes.post("/", DomainController.createDomain);
domainRoutes.delete("/:id", DomainController.deleteDomain);
domainRoutes.put("/:id", DomainController.updateDomain);

export default domainRoutes;
