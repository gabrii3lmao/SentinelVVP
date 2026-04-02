import express from "express";
import { UserController } from "../controller/user.controller.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const authRoutes = express.Router();

authRoutes.post("/login", UserController.loginUser);
authRoutes.post("/register", UserController.createUser);
authRoutes.post("/logout", authMiddleware, UserController.logoutUser);

export default authRoutes;
