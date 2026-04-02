import type { Request, Response } from "express";
import db from "../db/index.js";
import { users } from "../db/schema.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../service/jwtService.js";
import { createUserSchema, loginUserSchema } from "../dtos/user.dto.js";
import { eq } from "drizzle-orm";

class UserController {
  static async createUser(req: Request, res: Response) {
    try {

      const { name, email, password } = createUserSchema.parse(req.body);

      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      
      const [newUser] = await db
        .insert(users)
        .values({
          name,
          email,
          passwordHash: passwordHash,
        })
        .returning();

        if(!newUser) {
          return res.status(500).json({ message: "Erro ao criar usuário" });
        }

      const { passwordHash: _, ...userWithoutPassword } = newUser;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = loginUserSchema.parse(req.body);

    try {
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
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao fazer login", error });
    }
  }
}
