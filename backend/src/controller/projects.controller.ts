import db from "../db/index.js";
import { projects } from "../db/schema.js";
import { eq, and } from "drizzle-orm";
import type { Request, Response } from "express";
import { createProjectSchema } from "../dtos/projects.dto.js";
import z from "zod";

const idParamSchema = z.object({
  id: z.uuid(),
});

export class ProjectsController {
  static async createProject(req: Request, res: Response) {
    try {
      const { name } = createProjectSchema.parse(req.body);
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [newProject] = await db
        .insert(projects)
        .values({
          userId,
          name,
        })
        .returning();

      return res.status(201).json(newProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid input", errors: error });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProjects(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const userProjects = await db
        .select()
        .from(projects)
        .where(eq(projects.userId, userId));

      return res.status(200).json(userProjects);
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async deleteProject(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = idParamSchema.parse(req.params).id;

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const deleteResult = await db
        .delete(projects)
        .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
        .returning();

      if (deleteResult.length === 0) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid project ID", errors: error });
      }
      return res.status(500).json({ message: "Internal server error", error });
    }
  }

  static async updateProject(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const projectId = idParamSchema.parse(req.params).id;
      const { name } = createProjectSchema.parse(req.body);

      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const [updatedProject] = await db
        .update(projects)
        .set({ name, updatedAt: new Date() })
        .where(and(eq(projects.id, projectId), eq(projects.userId, userId)))
        .returning();

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      return res.status(200).json(updatedProject);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid input", errors: error });
      }
      console.error("Error updating project:", error);
      return res.status(500).json({ message: "Internal server error", error });
    }
  }
}
