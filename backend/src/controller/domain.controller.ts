import type { Request, Response } from "express";
import { domains, logs, projects } from "../db/schema.js";
import { createDomainSchema } from "../dtos/domains.dto.js";
import db from "../db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.uuid(),
});

const projectParamSchema = z.object({
  projectId: z.uuid(),
});

export class DomainController {
  static async createDomain(req: Request, res: Response) {
    try {
      const { url, checkInterval, timeout } = createDomainSchema.parse(
        req.body,
      );
      const { projectId } = projectParamSchema.parse(req.params);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const project = await db
        .select()
        .from(projects)
        .where(and(eq(projects.id, projectId), eq(projects.userId, userId)));

      // drizzle retorna um array, mesmo que seja apenas um item, então verificamos se o array está vazio para determinar se o projeto existe e pertence ao usuário

      if (project.length === 0) {
        return res
          .status(403)
          .json({ message: "Project not found or unauthorized" });
      }

      const existingDomain = await db
        .select()
        .from(domains)
        .where(
          and(
            eq(domains.url, url),
            eq(domains.userId, userId),
            eq(domains.projectId, projectId),
          ),
        );

      if (existingDomain.length > 0) {
        return res
          .status(400)
          .json({ message: "Domain already exists in this project" });
      }

      const [newDomain] = await db
        .insert(domains)
        .values({
          userId,
          url,
          checkInterval,
          timeout,
          projectId,
        })
        .returning();

      return res.status(201).json(newDomain);
    } catch (error) {
      // Verifica se o erro é uma instância de ZodError para retornar erros de validação específicos para o frontend
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error });
      }
      return res.status(500).json({ message: "Error creating domain", error });
    }
  }

  static async getDomains(req: Request, res: Response) {
    try {
      const { projectId } = projectParamSchema.parse(req.params);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userDomains = await db
        .select()
        .from(domains)
        .where(
          and(eq(domains.userId, userId), eq(domains.projectId, projectId)),
        );

      return res.status(200).json(userDomains);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching domains", error });
    }
  }

  static async deleteDomain(req: Request, res: Response) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const { projectId } = projectParamSchema.parse(req.params);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [deletedDomain] = await db
        .delete(domains)
        .where(
          and(
            eq(domains.id, id),
            eq(domains.userId, userId),
            eq(domains.projectId, projectId),
          ),
        )
        .returning();

      if (!deletedDomain) {
        return res
          .status(404)
          .json({ message: "Domain not found or unauthorized" });
      }

      return res.status(200).json({ message: "Domain deleted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid params", errors: error });
      }
      return res.status(500).json({ message: "Error deleting domain", error });
    }
  }

  static async updateDomain(req: Request, res: Response) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const { projectId } = projectParamSchema.parse(req.params);
      const { url, checkInterval, timeout } = createDomainSchema.parse(
        req.body,
      );
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [updatedDomain] = await db
        .update(domains)
        .set({ url, checkInterval, timeout, updatedAt: new Date() })
        .where(
          and(
            eq(domains.id, id),
            eq(domains.userId, userId),
            eq(domains.projectId, projectId),
          ),
        )
        .returning();

      if (!updatedDomain) {
        return res
          .status(404)
          .json({ message: "Domain not found or unauthorized" });
      }

      return res.status(200).json(updatedDomain);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error });
      }
      return res.status(500).json({ message: "Error updating domain", error });
    }
  }

  static async getLogs(req: Request, res: Response) {
    try {
      const { id } = idParamSchema.parse(req.params);
      const { projectId } = projectParamSchema.parse(req.params);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const domainOwnership = await db
        .select()
        .from(domains)
        .where(
          and(
            eq(domains.id, id),
            eq(domains.userId, userId),
            eq(domains.projectId, projectId),
          ),
        );

      if (domainOwnership.length === 0) {
        return res
          .status(403)
          .json({ message: "Domain not found or unauthorized" });
      }

      const domainLogs = await db
        .select()
        .from(logs)
        .where(eq(logs.domainId, id));

      return res.status(200).json(domainLogs);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching logs", error });
    }
  }
}
