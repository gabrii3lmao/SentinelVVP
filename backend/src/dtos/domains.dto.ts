import { z } from "zod";

export const createDomainSchema = z.object({
  body: z.object({
    url: z
      .url({ error: "Insira uma url válida (ex: https://www.exemplo.com)" })
      .transform((val) => val.toLowerCase()),
    checkInterval: z
      .number()
      .int()
      .min(30, { error: "O intervalo mínimo é de 30 segundos" })
      .max(86400, {
        error: "O intervalo máximo é de 24 horas (86400 segundos)",
      }),
  }),
});

export type CreateDomainInput = z.infer<typeof createDomainSchema>["body"];