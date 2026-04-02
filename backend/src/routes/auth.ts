import express from "express";
import { UserController } from "../controller/user.controller.js";

const authRoutes = express.Router();


authRoutes.post("/login", UserController.loginUser);
authRoutes.post("/register", UserController.createUser);
authRoutes.post("/logout", UserController.logoutUser);

export default authRoutes;



