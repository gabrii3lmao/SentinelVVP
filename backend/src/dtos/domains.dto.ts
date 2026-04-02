import { min } from "drizzle-orm";
import { z } from "zod";

export const createDomainSchema = z.object({
  url: z.url("Invalid URL format"),
  checkInterval: z.number().min(30, "mínimo de 30 segundos").max(86400, "máximo de 24 horas"),
});

export type CreateDomainInput = z.infer<typeof createDomainSchema>;