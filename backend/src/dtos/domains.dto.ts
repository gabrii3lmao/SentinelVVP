import { z } from "zod";

export const createDomainSchema = z.object({
  url: z.url("Invalid URL format"),
  checkInterval: z.number().min(30, "mínimo de 30 segundos").max(86400, "máximo de 24 horas"),
  timeout: z.number().min(1000, "mínimo de 1000 ms").max(60000, "máximo de 60 segundos"),
});

export type CreateDomainInput = z.infer<typeof createDomainSchema>;