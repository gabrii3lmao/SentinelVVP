import type { Request, Response, NextFunction } from "express";
import { verifyToken } from "../service/jwt.service.js";
import jwt from "jsonwebtoken";

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = verifyToken(token) as jwt.JwtPayload;
    req.user = { id: decoded.userId };
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Sessão expirada ou token inválido" });
  }
};
