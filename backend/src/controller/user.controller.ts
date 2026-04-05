import type { Request, Response } from "express";
import db from "../db/index.js";
import { users } from "../db/schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../service/jwt.service.js";
import { createUserSchema, loginUserSchema } from "../dtos/user.dto.js";
import { eq } from "drizzle-orm";
import { z } from "zod";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const { name, email, password } = createUserSchema.parse(req.body);

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (existingUser.length > 0) {
        return res.status(400).json({ message: "Email já registrado" });
      }

      const [newUser] = await db
        .insert(users)
        .values({
          name,
          email,
          passwordHash: passwordHash,
        })
        .returning();

      if (!newUser) {
        return res.status(500).json({ message: "Erro ao criar usuário" });
      }

      const { passwordHash: _, ...userWithoutPassword } = newUser;

      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Erro de validação nos dados enviados", errors: error });
      }
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  static async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = loginUserSchema.parse(req.body);
      const [user] = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      if (!user) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Email ou senha inválidos" });
      }

      const token = generateToken(user.id.toString());

      return res.status(200).json({
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Erro de validação nos dados enviados", errors: error });
      }
      return res.status(500).json({ message: "Erro ao fazer login", error });
    }
  }

  static async logoutUser(req: Request, res: Response) {
    try {
      return res
        .status(200)
        .clearCookie("token", cookieOptions)
        .json({ message: "Logout bem-sucedido" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao fazer logout", error });
    }
  }
}
