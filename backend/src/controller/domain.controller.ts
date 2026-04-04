import type { Request, Response } from "express";
import { domains, logs } from "../db/schema.js";
import { createDomainSchema } from "../dtos/domains.dto.js";
import db from "../db/index.js";
import { eq, and } from "drizzle-orm";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.uuid(),
});

export class DomainController {
  static async createDomain(req: Request, res: Response) {
    try {
      const { url, checkInterval, timeout } = createDomainSchema.parse(
        req.body,
      );

      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const existingDomain = await db
        .select()
        .from(domains)
        .where(and(eq(domains.url, url), eq(domains.userid, userId)));

      if (existingDomain.length > 0) {
        return res.status(400).json({ message: "Domain already exists" });
      }

      const [newDomain] = await db
        .insert(domains)
        .values({
          userid: userId,
          url,
          checkInterval,
          timeout,
        })
        .returning();

      return res.status(201).json(newDomain);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error });
      }
      return res.status(500).json({ message: "Error creating domain", error });
    }
  }

  static async getDomains(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userDomains = await db
        .select()
        .from(domains)
        .where(eq(domains.userid, userId));
      return res.status(200).json(userDomains);
    } catch (error) {
      return res.status(500).json({ message: "Error fetching domains", error });
    }
  }

  static async deleteDomain(req: Request, res: Response) {
    try {
      const id = idParamSchema.parse(req.params).id;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [deletedDomain] = await db
        .delete(domains)
        .where(and(eq(domains.id, id), eq(domains.userid, userId)))
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
          .json({ message: "Invalid domain ID", errors: error });
      }
      console.error(error);
      return res.status(500).json({ message: "Error deleting domain", error });
    }
  }

  static async updateDomain(req: Request, res: Response) {
    try {
      const id = idParamSchema.parse(req.params).id;
      const { url, checkInterval, timeout } = createDomainSchema.parse(
        req.body,
      );
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [updatedDomain] = await db
        .update(domains)
        .set({ url, checkInterval, timeout })
        .where(and(eq(domains.id, id), eq(domains.userid, userId)))
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
      console.error(error);
      return res.status(500).json({ message: "Error updating domain", error });
    }
  }

  static async getLogs(req: Request, res: Response) {
    try {
      const id = idParamSchema.parse(req.params).id;
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const domainOwnership = await db
        .select()
        .from(domains)
        .where(and(eq(domains.id, id), eq(domains.userid, userId)));

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
