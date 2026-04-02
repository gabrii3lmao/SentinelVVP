import express from "express"
import { DomainController } from "../controller/domain.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const domainRoutes = express.Router();

domainRoutes.post("/", authMiddleware, DomainController.createDomain);
domainRoutes.get("/", authMiddleware, DomainController.getDomains);
domainRoutes.delete("/:id", authMiddleware, DomainController.deleteDomain);
domainRoutes.put("/:id", authMiddleware, DomainController.updateDomain);

export default domainRoutes;