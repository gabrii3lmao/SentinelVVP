import { Worker, Job } from "bullmq";
import { redisConfig } from "../config/redis.js";
import { AxiosMonitorStrategy } from "../service/monitor/AxiosStrategy.js";
import db from "../db/index.js";
import { logs, domains } from "../db/schema.js";
import { eq } from "drizzle-orm";

const strategy = new AxiosMonitorStrategy();

const worker = new Worker(
  "ping-queue",
  async (job: Job) => {
    const { domainId, url, timeout } = job.data;
    const result = await strategy.check(url, timeout);

    if (!result.success) {
      throw new Error(`Falha ao acessar ${url}: ${result.errorMessage}`);
    }

    await db.insert(logs).values({
      domainId,
      statusCode: result.statusCode,
      responseTime: result.latency,
      isSuccess: true,
    });

    await db
      .update(domains)
      .set({
        status: "up",
        lastChecked: new Date(),
      })
      .where(eq(domains.id, domainId));

    return result;
  },
  {
    connection: redisConfig,
  },
);

worker.on("failed", async (job, err) => {
  if (job) {
    const { domainId } = job.data;

    await db.insert(logs).values({
      domainId,
      statusCode: 0,
      responseTime: 0,
      isSuccess: false,
      errorMessage: err.message,
    });

    await db
      .update(domains)
      .set({
        status: "down",
        isActive: false,
        lastChecked: new Date(),
      })
      .where(eq(domains.id, domainId));
  }
});
