import express from "express";
import bcrypt from "bcryptjs";
import db from "../db/index.js";
import "dotenv/config";

const authRoutes = express.Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};




