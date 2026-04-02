import express from "express";
import authRoutes from "./auth.js";
import domainRoute from "./domain.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/domains", domainRoute);

export default router;
