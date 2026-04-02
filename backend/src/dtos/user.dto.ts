import { z } from "zod";

const UserBase = {
  email: z.email({ error: "Insira um email válido" }).toLowerCase().trim(),
  password: z
    .string()
    .min(8, { error: "A senha deve conter no mínimo 8 caracteres" }),
};

export const createUserSchema = z.object({
  ...UserBase,
  name: z
    .string()
    .min(2, { error: "O nome deve conter no mínimo 2 caracteres" })
    .trim(),
});

export const loginUserSchema = z.object({
  ...UserBase,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginUserInput = z.infer<typeof loginUserSchema>;
